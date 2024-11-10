import cv2
import serial
import pytesseract
import numpy as np
import requests
import serial_reader
import image_processing

requests.post("https://swag.up.railway.app/submit", json={"id": "the persons id", "feedback": "the persons feedback"})

# Path to the uploaded image
image_path = '/Users/river/Desktop/hack_the_change/submission.jpg'

a = serial_reader.init_serial()

print("enter id!")

gov_ID_num = serial_reader.get_user_id(a)
serial_reader.close_serial(a)

input("Press Enter to continue...")

# Preprocess the image
preprocessed_image = image_processing.preprocess_image(image_path)

# Optional: Display the preprocessed image if in a GUI-capable environment
cv2.imshow('Preprocessed Image', preprocessed_image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Perform OCR
extracted_text = image_processing.perform_ocr(preprocessed_image)

# Print the extracted text
print("Extracted Text:")
print(extracted_text)

print("identification is: ")
print(gov_ID_num)

#requests.post("https://swag.up.railway.app/submit", json={"id": gov_ID_num, "feedback": extracted_text})
