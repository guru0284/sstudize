from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "*"}})  # Adjust the origins accordingly

# Set up logging
logging.basicConfig(level=logging.INFO)

@app.route('/')
def home():
    return "Flask server is running. Use /analyze (POST) to submit quiz responses."

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    Receives quiz responses and returns a dummy SOCA (Strengths, Opportunities, Challenges, Action Plan) analysis.
    """
    try:
        # Get the JSON data from the request
        data = request.get_json()
        if not data or "responses" not in data:
            return jsonify({"error": "Invalid input data"}), 400
        
        responses = data.get("responses", [])

        # ---------------------------
        # Dummy Analysis Logic
        # ---------------------------
        strengths = []
        opportunities = []
        challenges = []
        action_plan = []

        for idx, response in enumerate(responses):
            if not response or response.strip() == "":
                challenges.append(f"Question {idx+1} was not answered.")
                opportunities.append(f"Revise topics related to question {idx+1}.")
                action_plan.append("Review and practice similar problems.")
            else:
                # Example logic: If the answer has more than 3 words, call it a 'strength'
                word_count = len(response.split())
                if word_count > 3:
                    strengths.append(f"Detailed response for question {idx+1}.")
                else:
                    opportunities.append(f"Consider providing more detail for question {idx+1}.")

        # Create a structured JSON response
        analysis_result = {
            "strengths": strengths if strengths else ["No specific strengths identified"],
            "opportunities": opportunities if opportunities else ["No major opportunities identified"],
            "challenges": challenges if challenges else ["No critical challenges detected"],
            "action_plan": action_plan if action_plan else ["No immediate action required"]
        }

        # Return the analysis as JSON
        return jsonify({"analysis": analysis_result})

    except Exception as e:
        logging.error(f"Error during analysis: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Run the Flask server in debug mode
    app.run(debug=True)
