#include <Keypad.h>

const byte ROWS = 4; 
const byte COLS = 4; 

char hexaKeys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte rowPins[ROWS] = {9, 8, 7, 6}; 
byte colPins[COLS] = {5, 4, 3, 2}; 

Keypad customKeypad = Keypad(makeKeymap(hexaKeys), rowPins, colPins, ROWS, COLS); 

char id_number[10]; // 10 characters + null terminator
int index = 0;

void setup(){
  Serial.begin(9600);
  //Serial.println("Enter your 9-character Alberta Driver's License ID Number...");
}
  
void loop(){
  char customKey = customKeypad.getKey();
  
  if (customKey && index < 10) {
    id_number[index] = customKey; // Store the character
    index++; // Move to the next index
  }

  if (index == 9) { // Check if we've collected 9 characters
    id_number[index] = '\0'; // Null-terminate the string
    //Serial.print("ID Number: ");
    Serial.print(id_number);
    //Serial.println("Success!");
    index = 0; // Reset for next input
  }
}
