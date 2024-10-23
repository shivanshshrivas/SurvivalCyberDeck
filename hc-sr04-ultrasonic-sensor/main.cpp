#include <wiringPi.h>
#include <iostream>
#include <chrono>
#include <thread>

#define TRIG_PIN 4 // WiringPi pin 4, which is GPIO pin 23 (physical pin 16)
#define ECHO_PIN 5 // WiringPi pin 5, which is GPIO pin 24 (physical pin 18)

// Function to measure the distance
float measureDistance()
{
    std::cout << "Starting to measure distance..." << std::endl; // Debug

    // Ensure trigPin is low
    digitalWrite(TRIG_PIN, LOW);
    std::this_thread::sleep_for(std::chrono::microseconds(2));

    // Send a 10-microsecond pulse to trigPin
    std::cout << "Sending pulse to trigger pin..." << std::endl; // Debug
    digitalWrite(TRIG_PIN, HIGH);
    std::this_thread::sleep_for(std::chrono::microseconds(10));
    digitalWrite(TRIG_PIN, LOW);

    // Wait for echoPin to go HIGH
    std::cout << "Waiting for echo pin to go HIGH..." << std::endl; // Debug
    int timeoutCounter = 0;                                         // Debugging variable to prevent infinite loop
    while (digitalRead(ECHO_PIN) == LOW && timeoutCounter < 10000)
    {
        timeoutCounter++;
    }

    if (timeoutCounter >= 10000)
    {
        std::cerr << "Timeout: Echo pin didn't go HIGH!" << std::endl;
        return -1; // Return -1 if there is a timeout
    }

    auto startTime = std::chrono::steady_clock::now();

    // Wait for echoPin to go LOW
    std::cout << "Waiting for echo pin to go LOW..." << std::endl; // Debug
    timeoutCounter = 0;                                            // Reset timeout counter
    while (digitalRead(ECHO_PIN) == HIGH && timeoutCounter < 10000)
    {
        timeoutCounter++;
    }

    if (timeoutCounter >= 10000)
    {
        std::cerr << "Timeout: Echo pin didn't go LOW!" << std::endl;
        return -1; // Return -1 if there is a timeout
    }

    auto endTime = std::chrono::steady_clock::now();

    // Calculate the time in microseconds
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(endTime - startTime).count();
    std::cout << "Duration: " << duration << " microseconds" << std::endl; // Debug

    // Calculate distance (Speed of sound is 34300 cm/s, and duration is round-trip)
    float distance = (duration * 0.034) / 2;
    std::cout << "Calculated distance: " << distance << " cm" << std::endl; // Debug

    return distance;
}

int main()
{
    // Initialize WiringPi
    if (wiringPiSetup() == -1)
    {
        std::cerr << "WiringPi setup failed!" << std::endl;
        return 1;
    }

    std::cout << "WiringPi setup complete." << std::endl;

    // Set up the pins
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    std::cout << "Pins initialized." << std::endl;

    while (true)
    {
        float distance = measureDistance();
        if (distance != -1)
        { // Only print valid distance values
            std::cout << "Distance: " << distance << " cm" << std::endl;
        }
        else
        {
            std::cerr << "Error measuring distance!" << std::endl;
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(500)); // Wait for half a second
    }

    return 0;
}
