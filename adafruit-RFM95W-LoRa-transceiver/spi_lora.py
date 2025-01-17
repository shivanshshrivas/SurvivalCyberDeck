'''
Pinout connections for Lora module and Raspberry Pi:
VIN -> 3.3V
GND -> GND
SCK -> SCLK (Pin 23)
MISO -> MISO (Pin 21)
MOSI -> MOSI (Pin 19)
CS -> GPIO17 (Pin 11)
RST -> GPIO25 (Pin 22)
DIO0 -> unused
EN -> unused
'''

import spidev
import lgpio
import time

# Pin Definitions
CS_PIN = 17       # GPIO17 (Chip Select, Pin 11)
RESET_PIN = 25    # GPIO25 (Reset, Pin 22)

# SPI Configuration
SPI_BUS = 0
SPI_DEVICE = 0
SPI_SPEED = 50000  # 50 kHz
SPI_MODE = 0       # SPI Mode 0 (CPOL=0, CPHA=0)

# LoRa Register Definitions
REG_VERSION = 0x42   # Version register
REG_OP_MODE = 0x01   # Operating mode register
REG_FIFO = 0x00      # FIFO register
REG_PAYLOAD_LENGTH = 0x22  # Payload length register
REG_IRQ_FLAGS = 0x12       # IRQ flags register
REG_TX_BASE_ADDR = 0x0E    # Transmit base address
REG_FIFO_ADDR_PTR = 0x0D   # FIFO address pointer
REG_FIFO_TX_BASE_ADDR = 0x80  # FIFO TX base register

# LoRa Modes
MODE_SLEEP = 0x00
MODE_STANDBY = 0x01
MODE_TX = 0x03

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
    """Send a message via the LoRa module."""
    # Clear IRQ flags
    write_register(spi, handle, REG_IRQ_FLAGS, 0xFF)

    # Set LoRa to standby mode
    write_register(spi, handle, REG_OP_MODE, MODE_STANDBY)

    # Set FIFO address pointer to TX base address
    write_register(spi, handle, REG_FIFO_ADDR_PTR, REG_TX_BASE_ADDR)

    # Write message to FIFO
    for byte in message:
        write_register(spi, handle, REG_FIFO, byte)

    # Set payload length
    write_register(spi, handle, REG_PAYLOAD_LENGTH, len(message))

    # Set LoRa to TX mode
    write_register(spi, handle, REG_OP_MODE, MODE_TX)

    # Wait for TX done
    while (read_register(spi, handle, REG_IRQ_FLAGS) & 0x08) == 0:
        time.sleep(0.01)  # Poll every 10ms

    # Clear IRQ flags
    write_register(spi, handle, REG_IRQ_FLAGS, 0xFF)
    print(f"Message sent: {message.decode()}")

def main():
    # Set up GPIO and reset LoRa module
    handle = setup_gpio()
    reset_lora(handle)

    # Set up SPI
    spi = spidev.SpiDev()
    spi.open(SPI_BUS, SPI_DEVICE)
    spi.max_speed_hz = SPI_SPEED
    spi.mode = SPI_MODE

    # Read REG_VERSION to ensure communication
    print("Reading REG_VERSION...")
    reg_version = read_register(spi, handle, REG_VERSION)
    if reg_version == 0x12:
        print(f"LoRa module detected! REG_VERSION: 0x{reg_version:02X}")
    else:
        print(f"LoRa module not detected. REG_VERSION: 0x{reg_version:02X}")
        spi.close()
        lgpio.gpiochip_close(handle)
        return

    # Send a message every 2 seconds
    message = "Hello, LoRa!".encode()
    while True:
        send_message(spi, handle, message)
        time.sleep(2)  # Wait 2 seconds before sending the next message

if __name__ == "__main__":
    main()
