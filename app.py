from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Only needed if your front-end is served from a different origin

@app.route('/')
def home():
    return "Flask server is running. Visit /analyze (POST) to submit quiz responses."

@app.route('/analyze', methods=['POST'])
def analyze():
    """
    This route receives quiz responses from your front-end (ques.js).
    It returns a JSON response with a dummy SOCA analysis.
    Replace or enhance the dummy logic below with AI-driven analysis if desired.
    """
    # Get the JSON data sent from the front-end
    data = request.get_json()
    responses = data.get("responses", [])

    # -------------------------------------------------
    # Dummy Analysis Logic (Replace with your own)
    # -------------------------------------------------
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
            if len(response.split()) > 3:
                strengths.append(f"Detailed answer for question {idx+1}.")
            else:
                opportunities.append(f"Consider providing more detail for question {idx+1}.")

    # Create a simple HTML snippet or text summary
    soca_html = f"""
    <h3>Strengths:</h3>
    <ul>{''.join(f'<li>{s}</li>' for s in strengths) if strengths else '<li>None</li>'}</ul>
    <h3>Opportunities:</h3>
    <ul>{''.join(f'<li>{o}</li>' for o in opportunities) if opportunities else '<li>None</li>'}</ul>
    <h3>Challenges:</h3>
    <ul>{''.join(f'<li>{c}</li>' for c in challenges) if challenges else '<li>None</li>'}</ul>
    <h3>Action Plan:</h3>
    <ul>{''.join(f'<li>{a}</li>' for a in action_plan) if action_plan else '<li>No actions suggested</li>'}</ul>
    """

    # Return the analysis as JSON
    return jsonify({"analysis": soca_html})

if __name__ == '__main__':
    # Run the Flask server in debug mode
    app.run(debug=True)
