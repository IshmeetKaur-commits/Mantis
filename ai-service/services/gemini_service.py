import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# Initialize the correct client
client = genai.Client(api_key=api_key)

def ask_gemini(prompt):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt  # <--- Make sure 'contents=' is written here explicitly
    )
    return response.text