''' 
Connections for I2C communication (BM688 sensor): Raspberry Pi 5
VIN: Pin 1 (3.3V)
GND: Pin 6 (GND)
SCK: Pin 5 (SCL)
SDI: Pin 3 (SDA)
SCO: Pin 16 (GPIO 23)
3VO: Unused
CS: Unused
'''

import board
import adafruit_bme680
import time
import lgpio  # For controlling GPIO pins

# Set up the I2C interface and the BME680 sensor
i2c = board.I2C()  # Use default I²C bus
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c)

# Set up the GPIO pin for the CS (SCO) pin control
SCO_PIN = 23 # GPIO pin number for SCO (PIN 16)
lgpio.setwarnings(False)  # Disable warnings
gpio_chip = lgpio.gpiochip(0)  # Get the default GPIO chip
lgpio.gpio_claim(gpio_chip, SCO_PIN)  # Claim the GPIO pin

# Set the CS_PIN as an output pin
lgpio.gpio_dir(gpio_chip, SCO_PIN, lgpio.OUTPUT)

# Temperature offset (adjust based on calibration)
temperature_offset = 14.00  # Adjust this value to match the temperature read by a thermometer

def read_bme680():
    """Function to control the CS pin and read data from BME680"""
    # Set CS pin high before reading
    lgpio.gpio_write(gpio_chip, SCO_PIN, 1)

    # Get the sensor data
    temperature = bme680.temperature - temperature_offset
    humidity = bme680.humidity
    pressure = bme680.pressure

    # Set CS pin low after reading
    lgpio.gpio_write(gpio_chip, SCO_PIN, 0)

    return temperature, humidity, pressure

while True:
    # Call the function to read the data
    temperature, humidity, pressure = read_bme680()

    # Print the sensor data
    print(f"Temperature: {temperature:.2f} °C")
    print(f"Humidity: {humidity:.2f} %")
    print(f"Pressure: {pressure:.2f} hPa")
    print("-" * 40)

    time.sleep(2)
