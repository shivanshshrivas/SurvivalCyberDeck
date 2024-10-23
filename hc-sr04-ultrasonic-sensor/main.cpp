#include <wiringPi.h>
#include <iostream>
#include <chrono>
#include <thread>

#define TRIG_PIN 4  // WiringPi pin 4, which is GPIO pin 23 (physical pin 16)
#define ECHO_PIN 5  // WiringPi pin 5, which is GPIO pin 24 (physical pin 18)

// Function to measure the distance
float measureDistance() {
    // Ensure trigPin is low
    digitalWrite(TRIG_PIN, LOW);
    std::this_thread::sleep_for(std::chrono::microseconds(2));

    // Send a 10-microsecond pulse to trigPin
    digitalWrite(TRIG_PIN, HIGH);
    std::this_thread::sleep_for(std::chrono::microseconds(10));
    digitalWrite(TRIG_PIN, LOW);

    // Wait for echoPin to go HIGH
    while (digitalRead(ECHO_PIN) == LOW);
    auto startTime = std::chrono::steady_clock::now();

    // Wait for echoPin to go LOW
    while (digitalRead(ECHO_PIN) == HIGH);
    auto endTime = std::chrono::steady_clock::now();

    // Calculate the time in microseconds
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(endTime - startTime).count();

    // Calculate distance (Speed of sound is 34300 cm/s, and duration is round-trip)
    float distance = (duration * 0.034) / 2;

    return distance;
}

int main() {
    // Initialize WiringPi
    if (wiringPiSetup() == -1) {
        std::cerr << "WiringPi setup failed!" << std::endl;
        return 1;
    }

    // Set up the pins
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);

    while (true) {
        float distance = measureDistance();
        std::cout << "Distance: " << distance << " cm" << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(500)); // Wait for half a second
    }

    return 0;
}
