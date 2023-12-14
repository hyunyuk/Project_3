from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def welcome():
    return (
        f"Welcome To New York State's Child Care Services Homepage!<br/>"
        f"----------------------------------------<br/>"
        f"Available Routes:<br/>"
        f"----------------------------------------<br/>"
        f"<a href = 'http://127.0.0.1:5000/json'> JSON</a> <br/>"
        f"<a href = 'http://127.0.0.1:5000/ny_map_and_chart'> NY Chart </a> <br/>"
        f"<a href = 'http://127.0.0.1:5000/ny_map_detailed'> NYS Child Care Locations</a> <br/>"
        f"<a href = 'http://127.0.0.1:5000//amanda_js'> NYS Child Care Summary</a> <br/>"

    )

@app.route('/json')
def json_get():
    # Make GET request to API endpoint
    response = requests.get('https://data.ny.gov/resource/fymg-3wv3.json')
    # JSON response
    data = response.json()
    # Return JSON data as JSONified Flask response
    return jsonify(data)

@app.route('/ny_map_and_chart')
def charts():
    return render_template("tiffany.html")

@app.route('/ny_map_detailed')
def nyMap():
    return render_template("alaa.html")

@app.route('/amanda_js')
def summary():
    return render_template("amanda.html")

if __name__ == '__main__':
    app.run(debug=True)