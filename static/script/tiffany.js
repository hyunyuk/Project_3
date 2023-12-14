// Create Map
let myMap = L.map("map", {
    center: [42.9531, -75.5268],
    zoom: 6
    });
        
// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
        
// URL
const nyUrl = "https://data.ny.gov/resource/fymg-3wv3.json";
        
// Fetch JSON
d3.json(nyUrl).then(function (data) {
    console.log(data);
    addMarkers(data);
    createBarChart(data);
    });
        
// Function to add markers to the map
function addMarkers(data) {
    data.forEach((point) => {
    // Check if the entry has latitude and longitude information
    if (point.latitude && point.longitude) {
    // Create a marker and add it to the map
    L.marker([parseFloat(point.latitude), parseFloat(point.longitude)])
        .addTo(myMap)
        .bindPopup(`<h3>Facility Name: ${point.facility_name}</h3><br><h4>County: ${point.county}</h4><br><h4>Status: ${point.facility_status}</h4>`);
        }
    });
    }
        
    // Function to create a bar chart using Plotly
    function createBarChart(data) {
    // Count occurrences for each county
    const countyCounts = {};
    data.forEach((entry) => {
        const county = entry.county;
        countyCounts[county] = (countyCounts[county] || 0) + 1;
    });
        
    // Convert the counts to an array for Plotly bar chart
    const countsArray = Object.entries(countyCounts).map(([county, count]) => ({ county, count }));
        
    // Extract x and y values
    const xValues = countsArray.map(item => item.county);
    const yValues = countsArray.map(item => item.count);
        
    // Create Plotly bar chart
    Plotly.newPlot('bar-chart', [{
        x: xValues,
        y: yValues,
        type: 'bar'
        }], {
        title: 'Child Care Facilities Count by County'
        });
}
                