from flask import Flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import request, jsonify
from services.groq_client import GroqClient
from services.sanitizer import sanitize_input
from services.prompt_guard import is_prompt_injection

groq_client = GroqClient()

app = Flask(__name__)

limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=["30 per minute"]
)

@app.route("/")
def home():
    return "Server is running"

@app.route("/ask_ai", methods=["POST"])
def ask_ai():
    data = request.get_json()

    if not data or "prompt" not in data:
        return jsonify({"error": "Prompt is required"}), 400

    user_input = data["prompt"]

    # ✅ Step 1: Sanitize
    clean_input = sanitize_input(user_input)

    # ✅ Step 2: Check injection
    if is_prompt_injection(clean_input):
        return jsonify({"error": "Invalid input detected"}), 403

    # ✅ Step 3: Call AI
    response = groq_client.generate_response(clean_input)

    return jsonify({"response": response})

if __name__ == "__main__":
    
     app.run(debug=True)
