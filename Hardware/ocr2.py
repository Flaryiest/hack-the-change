import pytesseract
from PIL import Image

# Load the image
image = Image.open("/Users/river/Desktop/hack_the_change/change.jpg")

# Use Tesseract with a strict configuration for English words only
custom_config = r'--oem 3 --psm 6 -l eng tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz '

# Perform OCR
text = pytesseract.image_to_string(image, config=custom_config)

print("Initial OCR Text:\n", text)
