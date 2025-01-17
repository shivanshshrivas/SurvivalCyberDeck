''' 
Connections for I2C communication (BM688 sensor): Raspberry Pi 5
VIN: Pin 1 (3.3V)
GND: Pin 6 (GND)
SCK: Pin 5 (SCL)
SDI: Pin 3 (SDA)
SCO: Pin 2 (5V)
3VO: Unused
CS: Unused 
'''

import board
import adafruit_bme680
import time

i2c = board.I2C()  # Use default I²C bus
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c)

temperature_offset = 14.00  # Adjust this value to match the temperature read by a thermometer

while True:
    temperature = bme680.temperature - temperature_offset

    print(f"Temperature: {temperature:.2f} °C")
    print(f"Humidity: {bme680.humidity:.2f} %")
    print(f"Pressure: {bme680.pressure:.2f} hPa")
    print("-" * 40)
    time.sleep(2)