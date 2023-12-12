# Import dependencies
from flask import Flask, json, jsonify, render_template
import json
import requests
import csv

app = Flask(__name__)
@app.route('/')
def index():
    # Make GET request to API endpoint
    response = requests.get('https://data.ny.gov/resource/fymg-3wv3')
    #JSON response
    data = response.json() ## making the data in json format
    # Return JSON data as JSONified Flask response
    return jsonify(data)
if __name__ == '__main__':
    app.run(debug=True)