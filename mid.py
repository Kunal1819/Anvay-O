from fastapi import FastAPI, UploadFile, File
import uvicorn
from gtts import gTTS
import os

os.environ["OPENAI_API_KEY"] = "sk-proj-his-api-key"
NEO4J_URI = "neo4j+s://his-database-link"
NEO4J_USERNAME = "neo4j"
NEO4J_PASSWORD = "his-database-password"
# Initialize the FastAPI server
app = FastAPI(title="Voice Orchestrator API (Trilingual Edition)")

def mock_stt_transcription(audio_file) -> tuple:
    """
    Stage 1: Speech-to-Text (Mocked).
    It listens to the audio and extracts the text AND the language.
    For testing, change 'test_language' to "en", "hi", or "mr".
    """
    test_language = "hi"
    
    if test_language == "mr":
        return "प्रभाग ४ मध्ये काय समस्या आहे?", "mr"
    elif test_language == "hi":
        return "वार्ड 4 में क्या समस्या है?", "hi"
    else:
        return "What is the issue in Ward 4?", "en"

def mock_graph_database_fetch(user_query: str) -> str:
    """
    Stage 2 & 3: Database query. 
    Returns raw JSON data regardless of the input language.
    """
    print(f"Searching Database for: {user_query}")
    return "{'ward': 4, 'issue_count': 450, 'primary_concern': 'broken water pipelines'}"

def generate_conversational_response(raw_graph_data: str, lang_code: str) -> str:
    """
    Stage 4: LLM formatting. 
    Reads the raw data and formats it into a natural sentence in the correct language.
    """
    if lang_code == "mr":
        return "प्रभाग ४ मधील मुख्य समस्या तुटलेल्या पाण्याच्या पाईपलाईनची आहे, जिथे ४५० तक्रारी आहेत."
    elif lang_code == "hi":
        return "वार्ड 4 में मुख्य समस्या टूटी हुई पानी की पाइपलाइनों की है, जहां 450 शिकायतें हैं।"
    else:
        return "The primary issue in Ward 4 is broken water pipelines, with 450 reported complaints."

def generate_human_audio(text_payload: str, lang_code: str) -> str:
    """
    Stage 5: Text-to-Speech (TTS). 
    Generates the audio file in the requested language.
    """
    print(f"Generating audio in language '{lang_code}' for: {text_payload}")
    
    # TTS engine jo decide karega ki kaunsa language use karna hai based on lang_code
    tts = gTTS(text=text_payload, lang=lang_code)
    
    file_path = f"voice_response_{lang_code}.mp3"
    tts.save(file_path)
    print(f"Audio successfully saved to {file_path}")
    
    return file_path

@app.post("/api/voice_command")
async def process_voice_command(audio: UploadFile = File(...)):
    print("\n--- NEW REQUEST RECEIVED ---")
    try:
        print("1. Starting transcription phase...")
        user_text, detected_lang = mock_stt_transcription(audio)
        
        print("2. Fetching mock database data...")
        raw_data = mock_graph_database_fetch(user_text)
        
        print("3. Generating conversational script...")
        spoken_script = generate_conversational_response(raw_data, detected_lang)
        
        print("4. Sending text to Google TTS for audio generation (Requires Internet)...")
        audio_response_path = generate_human_audio(spoken_script, detected_lang)
        
        print("--- PIPELINE SUCCESS: MP3 GENERATED ---")
        return {
            "status": "success",
            "detected_language": detected_lang,
            "transcription": user_text,
            "raw_database_json": raw_data,
            "ai_voice_script": spoken_script,
            "audio_file": audio_response_path
        }

    except Exception as e:
        print(f"\n!!! PIPELINE FAILED !!! ERROR: {str(e)}")
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8005)