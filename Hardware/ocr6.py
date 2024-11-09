import cv2
import pytesseract
import numpy as np
import requests

requests.post("https://swag.up.railway.app/submit", json={"id": "the persons id", "feedback": "the persons feedback"})

# Path to the uploaded image
image_path = '/Users/river/Desktop/hack_the_change/submission.jpg'

def preprocess_image(image_path):
    # Step 1: Load the image
    img = cv2.imread(image_path)

    # Step 2: Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Step 3: Apply a stronger Gaussian Blur to reduce noise further
    blurred = cv2.GaussianBlur(gray, (7, 7), 0)

    # Step 4: Apply binary thresholding to make the text stand out
    _, thresh = cv2.threshold(blurred, 150, 255, cv2.THRESH_BINARY_INV)

    # Step 5: Dilate the text to make it more readable
    dilated = cv2.dilate(thresh, None, iterations=3)

    return dilated

def perform_ocr(preprocessed_image):
    # Step 6: Run Tesseract OCR with updated config
    config = '--psm 6 -c tessedit_char_whitelist="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"'
    text = pytesseract.image_to_string(preprocessed_image, config=config)

    return text

# Preprocess the image
preprocessed_image = preprocess_image(image_path)

# Optional: Display the preprocessed image if in a GUI-capable environment
cv2.imshow('Preprocessed Image', preprocessed_image)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Perform OCR
extracted_text = perform_ocr(preprocessed_image)

# Print the extracted text
print("Extracted Text:")
print(extracted_text)

requests.post("https://swag.up.railway.app/submit", json={"id": "the persons id", "feedback": "the persons feedback"})
