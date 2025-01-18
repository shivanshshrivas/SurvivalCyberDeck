import sys
import platform  # To detect OS
import random  # For mock data
from PyQt5.QtCore import QObject, pyqtSlot, pyqtSignal
from PyQt5.QtWidgets import QApplication
from PyQt5.QtQml import QQmlApplicationEngine

# Check if running on Raspberry Pi
is_raspberry_pi = platform.system() != "Windows"

if is_raspberry_pi:
    import board
    import busio
    import adafruit_bme680


class WeatherBackend(QObject):
    temperatureChanged = pyqtSignal(str, arguments=['temperature'])
    humidityChanged = pyqtSignal(str, arguments=['humidity'])

    def __init__(self):
        super().__init__()
        if is_raspberry_pi:
            # Initialize I2C communication with BME688
            i2c = busio.I2C(board.SCL, board.SDA)
            self.sensor = adafruit_bme680.Adafruit_BME680_I2C(i2c)
        else:
            self.sensor = None  # No I2C on Windows, using dummy data

    def generate_dummy_data(self):
        """Generate random dummy values for temperature and humidity."""
        dummy_temp = round(random.uniform(15, 30), 1)  # Random temp between 15°C and 30°C
        dummy_humidity = round(random.uniform(30, 70), 1)  # Random humidity between 30% and 70%
        return dummy_temp, dummy_humidity

    @pyqtSlot()
    def updateWeather(self):
        if is_raspberry_pi:
            # Fetch actual sensor data (commented out for now)
            # temp_value = f"Temperature: {self.sensor.temperature:.1f} °C"
            # humidity_value = f"Humidity: {self.sensor.humidity:.1f} %"

            # Using dummy data for now
            temp, humidity = self.generate_dummy_data()
        else:
            # Always use dummy data on Windows
            temp, humidity = self.generate_dummy_data()

        temp_value = f"Temperature: {temp} °C"
        humidity_value = f"Humidity: {humidity} %"

        # Emit signals with proper variable names
        self.temperatureChanged.emit(temp_value)
        self.humidityChanged.emit(humidity_value)


# Start the Qt Application
app = QApplication(sys.argv)
engine = QQmlApplicationEngine()

backend = WeatherBackend()
engine.rootContext().setContextProperty("backend", backend)

engine.load("main.qml")

# Ensure proper error handling in case QML fails to load
if not engine.rootObjects():
    print("Error: Failed to load QML file")
    sys.exit(-1)

sys.exit(app.exec_())
