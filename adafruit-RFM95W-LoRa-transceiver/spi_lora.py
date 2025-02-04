''' 
Connections for SPI communication (RFM95W LoRa): Raspberry Pi 5
VIN -> 3.3V
GND -> GND
EN -> unused
G0 -> unused
SCK -> SCLK (Pin 23)
MISO -> MISO (Pin 21)
MOSI -> MOSI (Pin 19)
CS -> GPIO17 (Pin 11)
RST -> GPIO25 (Pin 22)
'''


import spidev
import lgpio
import time
import threading

# Pin Definitions
CS_PIN = 17       # GPIO17 (Chip Select, Pin 11)
RESET_PIN = 25    # GPIO25 (Reset, Pin 22)

# SPI Configuration
SPI_BUS = 0
SPI_DEVICE = 0
SPI_SPEED = 25000  # 25 kHz
SPI_MODE = 0       # SPI Mode 0 (CPOL=0, CPHA=0)

# LoRa Register Definitions
REG_VERSION = 0x42        # Version register
REG_OP_MODE = 0x01        # Operating mode register
REG_FIFO = 0x00           # FIFO register
REG_PAYLOAD_LENGTH = 0x22 # Payload length register
REG_IRQ_FLAGS = 0x12      # IRQ flags register
REG_RX_NB_BYTES = 0x13    # Number of received bytes
REG_FIFO_RX_CURRENT_ADDR = 0x10  # FIFO RX current address
REG_FIFO_ADDR_PTR = 0x0D  # FIFO address pointer
REG_FIFO_RX_BASE_ADDR = 0x0F  # FIFO RX base address
REG_FIFO_TX_BASE_ADDR = 0x0E  # FIFO TX base address

# LoRa Modes
MODE_SLEEP = 0x00
MODE_STANDBY = 0x01
MODE_TX = 0x03
MODE_RX_CONTINUOUS = 0x05

# Track messages to prevent self-reception & duplicates
last_sent_message = None
last_received_message = None
last_received_time = 0
receiving_enabled = True  # Control flag for enabling/disabling receiving


def setup_gpio():
    """Set up GPIO for CS and RESET pins."""
    handle = lgpio.gpiochip_open(0)  # Open GPIO chip
    lgpio.gpio_claim_output(handle, CS_PIN, 1)  # CS pin, default HIGH
    lgpio.gpio_claim_output(handle, RESET_PIN, 1)  # RESET pin, default HIGH
    return handle


def reset_lora(handle):
    """Reset the LoRa module."""
    lgpio.gpio_write(handle, RESET_PIN, 0)
    time.sleep(0.1)  # Hold reset for 100ms
    lgpio.gpio_write(handle, RESET_PIN, 1)
    time.sleep(0.1)  # Allow module to initialize


def write_register(spi, handle, reg, value):
    """Write to a register on the LoRa module."""
    lgpio.gpio_write(handle, CS_PIN, 0)  # Pull CS LOW
    spi.xfer2([reg | 0x80, value])       # Send write command
    lgpio.gpio_write(handle, CS_PIN, 1)  # Pull CS HIGH


def read_register(spi, handle, reg):
    """Read a register from the LoRa module."""
    lgpio.gpio_write(handle, CS_PIN, 0)  # Pull CS LOW
    response = spi.xfer2([reg & 0x7F, 0x00])  # Send read command
    lgpio.gpio_write(handle, CS_PIN, 1)  # Pull CS HIGH
    return response[1]


def send_message(spi, handle, message):
    """Send a user-inputted message via the LoRa module."""
    global last_sent_message, receiving_enabled  

    # Disable receiving temporarily
    receiving_enabled = False  

    last_sent_message = message  

    # Clear IRQ flags before transmission
    write_register(spi, handle, REG_IRQ_FLAGS, 0xFF)

    # Set LoRa to standby mode
    write_register(spi, handle, REG_OP_MODE, MODE_STANDBY)
    time.sleep(0.01)

    # Set FIFO address pointer to TX base address
    write_register(spi, handle, REG_FIFO_ADDR_PTR, REG_FIFO_TX_BASE_ADDR)

    # Write message to FIFO
    for byte in message:
        write_register(spi, handle, REG_FIFO, byte)

    # Set payload length
    write_register(spi, handle, REG_PAYLOAD_LENGTH, len(message))

    # Set LoRa to TX mode
    write_register(spi, handle, REG_OP_MODE, MODE_TX)
    time.sleep(0.01)  

    # Wait for TX Done flag
    max_wait = 500  
    wait_time = 0
    while (read_register(spi, handle, REG_IRQ_FLAGS) & 0x08) == 0 and wait_time < max_wait:
        time.sleep(0.01)
        wait_time += 10

    # Read final IRQ flags
    irq_flags = read_register(spi, handle, REG_IRQ_FLAGS)

    if irq_flags & 0x08:
        print(f"\n✅ Transmission Successful (IRQ_FLAGS: 0x{irq_flags:02X})")
    else:
        print(f"\n❌ Transmission Failed (IRQ_FLAGS: 0x{irq_flags:02X}) - Check LoRa setup!")

    # Clear IRQ flags after transmission
    write_register(spi, handle, REG_IRQ_FLAGS, 0xFF)

    print(f"📨 Message sent: {message.decode()}")

    # Delay before switching back to receive mode
    time.sleep(1)  

    # Re-enable receiving
    receiving_enabled = True  


def receive_message(spi, handle):
    """Constantly listen for messages but only print when something is received."""
    global last_sent_message, last_received_message, last_received_time, receiving_enabled

    # Manually clear FIFO RX pointer before switching to receive mode
    write_register(spi, handle, REG_FIFO_ADDR_PTR, REG_FIFO_RX_BASE_ADDR)

    while True:
        if not receiving_enabled:
            time.sleep(0.1)
            continue  

        if (read_register(spi, handle, REG_IRQ_FLAGS) & 0x40) != 0:
            write_register(spi, handle, REG_IRQ_FLAGS, 0xFF)

            write_register(spi, handle, REG_FIFO_ADDR_PTR, read_register(spi, handle, REG_FIFO_RX_CURRENT_ADDR))

            num_bytes = read_register(spi, handle, REG_RX_NB_BYTES)

            if num_bytes < 3:
                continue  

            message = []
            for _ in range(num_bytes):
                message.append(read_register(spi, handle, REG_FIFO))

            received_text = bytes(message).decode()

            if last_sent_message and received_text == last_sent_message.decode():
                continue  

            # Ignore repeated messages received too quickly
            current_time = time.time()
            if last_received_message == received_text and (current_time - last_received_time) < 2:
                continue  

            # Update last received message and timestamp
            last_received_message = received_text
            last_received_time = current_time  

            print(f"\n📩 Received message: {received_text}")

            write_register(spi, handle, REG_FIFO_ADDR_PTR, REG_FIFO_RX_BASE_ADDR)

        time.sleep(0.1)  


def main():
    handle = setup_gpio()
    reset_lora(handle)

    spi = spidev.SpiDev()
    spi.open(SPI_BUS, SPI_DEVICE)
    spi.max_speed_hz = SPI_SPEED
    spi.mode = SPI_MODE

    print("\n🔍 Checking LoRa module...")
    reg_version = read_register(spi, handle, REG_VERSION)
    if reg_version != 0x12:
        print(f"❌ LoRa module not detected. REG_VERSION: 0x{reg_version:02X}")
        spi.close()
        lgpio.gpiochip_close(handle)
        return
    print(f"✅ LoRa module detected! REG_VERSION: 0x{reg_version:02X}")

    receiver_thread = threading.Thread(target=receive_message, args=(spi, handle), daemon=True)
    receiver_thread.start()

    while True:
        user_message = input("\n📝 Enter message to send (or 'exit' to quit): ").strip()

        if user_message.lower() == 'exit':
            print("\n👋 Exiting...")
            break
        elif user_message:
            send_message(spi, handle, user_message.encode())

    spi.close()
    lgpio.gpiochip_close(handle)


if __name__ == "__main__":
    main()
