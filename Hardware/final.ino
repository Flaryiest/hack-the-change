#include <Keypad.h>
#include <LiquidCrystal.h>

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int rs = 12, en = 11, d4 = 13, d5 = 10, d6 = A0, d7 = A1;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

const char message[] = "Enter your Alberta ID Number Now!";






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


void setup() {
  Serial.begin(9600);

  lcd.begin(16, 2);
  lcd.noAutoscroll();

  int msgLength = strlen(message);

  // Step 1: Display the first 16 characters of the message
  lcd.clear();
  lcd.setCursor(0, 0);
  for (int i = 0; i < 16; i++) {
    lcd.print(message[i]);

    delay(180);
  }
  
  delay(200);  // Pause to display the initial message before scrolling starts

  // Step 2: Start scrolling the message
  for (int start = 1; start <= msgLength - 16; start++) {
    lcd.clear();
    lcd.setCursor(0, 0);

    // Print the next 16 characters based on the scroll position
    for (int i = 0; i < 16 && (start + i) < msgLength; i++) {
      lcd.print(message[start + i]);
    }

    delay(280);  // Adjust delay for scrolling speed
  }


  while(index < 9)
  {
    char customKey = customKeypad.getKey();
  
    if (customKey && index < 10) 
    {
      id_number[index] = customKey; // Store the character
      index++; // Move to the next index
    }
  }
  id_number[index] = '\0';

  Serial.print(id_number);

  lcd.clear();
  lcd.print("Loading.....");
  
  while (!customKeypad.getKey()) {
    // Loop until a key is pressed
  }

  lcd.clear();

  lcd.print("Send Success!");
}

void loop()
{
  delay(500);
}