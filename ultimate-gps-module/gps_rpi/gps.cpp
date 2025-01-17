#include <wiringPi.h>
#include <wiringSerial.h>
#include <iostream>
#include <fstream>
#include <string>

#define GPS_BAUD 9600  // GPS baud rate
#define GPS_PORT "/dev/serial0"  // UART serial port

// Parse latitude and longitude from NMEA sentence
void parseNMEA(const std::string &nmea, std::string &latitude, std::string &longitude) {
    if (nmea.substr(0, 6) == "$GPGGA") {
        size_t lat_start = nmea.find(",", 18) + 1;
        size_t lat_end = nmea.find(",", lat_start);
        latitude = nmea.substr(lat_start, lat_end - lat_start);
        
        size_t long_start = nmea.find(",", lat_end + 3) + 1;
        size_t long_end = nmea.find(",", long_start);
        longitude = nmea.substr(long_start, long_end - long_start);
    }
}

int main() {
    // Initialize WiringPi
    
    std::cout<<"Hallo1"<<std::endl;

    if (wiringPiSetup() == -1) {
        std::cerr << "Failed to initialize WiringPi." << std::endl;
        return 1;
    }
    std::cout<<"Hallo2"<<std::endl;

    // Open GPS serial port
    int serial_port;
    if ((serial_port = serialOpen(GPS_PORT, GPS_BAUD)) < 0) {
        std::cerr << "Unable to open serial port." << std::endl;
        return 1;
    }

    std::cout<<"Hallo3"<<std::endl;

    std::ofstream gps_data("coordinates.txt");
    if (!gps_data.is_open()) {
        std::cerr << "Failed to open file for writing coordinates." << std::endl;
        return 1;
    }

    std::cout<<"Hallo4"<<std::endl;

    std::string latitude, longitude;
    std::cout<<"String::"<<latitude<<std::endl;
    
    while (true) {
        std::cout<<"MAKIChuuuuuuuMEREBETE!!!!"<<std::endl;
        if (serialDataAvail(serial_port)) {
            char c = serialGetchar(serial_port);
            static std::string nmea_sentence;
            
            if (c == '\n') {
                parseNMEA(nmea_sentence, latitude, longitude);

                if (!latitude.empty() && !longitude.empty()) {
                    gps_data << "Latitude: " << latitude << ", Longitude: " << longitude << std::endl;
                    gps_data.flush();
                    std::cout << "Latitude: " << latitude << ", Longitude: " << longitude << std::endl;
                }
                nmea_sentence.clear();
            } else {
                nmea_sentence += c;
            }
        }
        delay(100);  // Small delay for buffer handling
    }

    gps_data.close();
    serialClose(serial_port);
    return 0;
}
