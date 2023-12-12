from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def welcome():
    return (
        f"/json <br/>"
        f"/ny_map_and_chart <br/>"
        # f"/amanda_js <br/>"
        # f"/alaa_js <br/>"
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

if __name__ == '__main__':
    app.run(debug=True)