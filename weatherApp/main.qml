import QtQuick 2.15
import QtQuick.Controls 2.15
import "theme.js" as Theme  // Import JavaScript for styling

ApplicationWindow {
    visible: true
    width: 640
    height: 480
    title: qsTr("Weather App")
    color: Theme.theme.primaryColor  // Apply background color dynamically

    Column {
        spacing: 10
        anchors.centerIn: parent

        // Temperature Display
        Text {
            id: tempText
            text: "Temperature: -- °C"
            font.pointSize: 20
            color: Theme.theme.textColor  // Use theme.js
        }

        // Humidity Display
        Text {
            id: humidityText
            text: "Humidity: -- %"
            font.pointSize: 20
            color: Theme.theme.textColor  // Use theme.js
        }

        // Update Button
        Button {
            background: Rectangle {
                id: buttonBg
                color: Theme.theme.buttonColor
                radius: 5
            }
            contentItem: Text {
                text: "Update Weather"
                color: Theme.theme.textColor
            }

            MouseArea {
                anchors.fill: parent
                onEntered: buttonBg.color = Theme.theme.buttonHoverColor
                onExited: buttonBg.color = Theme.theme.buttonColor
                onClicked: backend.updateWeather()
            }
        }
    }

    // Connections to Backend
    Connections {
        target: backend
        onTemperatureChanged: (value) => tempText.text = value
        onHumidityChanged: (value) => humidityText.text = value
    }
}
