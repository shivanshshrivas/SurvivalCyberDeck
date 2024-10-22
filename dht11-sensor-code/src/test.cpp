#include <iostream>
#include "wiringPi.h"

using namespace std;

int main(){
    if (wiringPiSetup() == -1) {
        cout << "Failed to initialize wiringPi" << endl;
        return 1;
    }
    
    for (int i= 0; i <=40; i++){
        cout<<"For i = "<<i<<endl;
        pinMode(15, OUTPUT);
        digitalWrite(15, HIGH);
        delay(1500);
        digitalWrite(15, LOW);
        delay(1500);
    }
}

