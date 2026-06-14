import os
from services.gemini_service import ask_gemini

if __name__ == "__main__":
    print("Testing Gemini Service...")
    try:
        prompt = "Act as a technician. Ask one follow-up question for a scooter horn not working."
        result = ask_gemini(prompt)
        print("\n--- Gemini Response ---")
        print(result)
        print("-----------------------")
    except Exception as e:
        print(f"An error occurred: {e}")