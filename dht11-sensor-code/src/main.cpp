#include <iostream>
#include <stdio.h>
#include "interface.cpp" 

using namespace std;

int main() {
    // Initialize the wiringPi library
    if (wiringPiSetup() == -1) {
        cout << "Failed to initialize wiringPi" << endl;
        return 1;
    }

    dht11 sensor;
    while(1){
        cout << "Error code: " << sensor.read(7) << endl;
        cout << "Temperature: " << sensor.temperature << " *C" << endl;
        cout << "Humidity: " << sensor.humidity << " %" << endl;
        cout << "-----------------" << endl;
    }
    
    return 0;
}
