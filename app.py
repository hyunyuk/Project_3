from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def welcome():
    return (
        f"Welcome to Child Care Providers in New York State!<br/>"
        f"----------------------------------------<br/>"
        f"Available Routes:<br/>"
        f"----------------------------------------<br/>"
        f"<a href = 'http://127.0.0.1:5000/json'> JSON</a> <br/>"
        f"<a href = 'http://127.0.0.1:5000/ny_state_level'> NY State Level Child Care Dashboard </a> <br/>"
        f"<a href = 'http://127.0.0.1:5000/ny_county_level'> NY County Level Child Care Dashboard </a> <br/>"
    )

@app.route('/json')
def json_get():
    # Make GET request to API endpoint
    response = requests.get('https://data.ny.gov/resource/fymg-3wv3.json')
    # JSON response
    data = response.json()
    # Return JSON data as JSONified Flask response
    return jsonify(data)

@app.route('/ny_state_level')
def charts():
    return render_template("ny_state.html")

@app.route('/ny_county_level')
def nyMap():
    return render_template("ny_county.html")


if __name__ == '__main__':
    app.run(debug=True)
 