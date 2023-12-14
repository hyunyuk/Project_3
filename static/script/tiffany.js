// Create Map
let myMap = L.map("map", {
    center: [42.9531, -75.5268],
    zoom: 6
    });
        
// Add tile layer
let streetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let baseMaps = {
    "Street Map":streetmap
};

let Albany =  new L.LayerGroup();
let Allegany =  new L.LayerGroup();
let Bronx = new L.LayerGroup();
let Brooklyn=  new L.LayerGroup();
let Broome=  new L.LayerGroup();
let Cattaraugus=  new L.LayerGroup();
let Cayuga=  new L.LayerGroup();
let Chautauqua=  new L.LayerGroup();
let Chemung=  new L.LayerGroup();
let Chenango=  new L.LayerGroup();
let Clinton=  new L.LayerGroup();
let Columbia=  new L.LayerGroup();
let Cortland=  new L.LayerGroup();
let Delaware=  new L.LayerGroup();
let Dutchess=  new L.LayerGroup();
let Erie=  new L.LayerGroup();
let Essex=  new L.LayerGroup();
let Franklin=  new L.LayerGroup();
let Fulton=  new L.LayerGroup();
let Genesee=  new L.LayerGroup();
let Greene=  new L.LayerGroup();
let Hamiliton=  new L.LayerGroup();
let Herkimer=  new L.LayerGroup();
let Jefferson=  new L.LayerGroup();
let Lewis=  new L.LayerGroup();
let Livingston=  new L.LayerGroup();
let Madison=  new L.LayerGroup();
let Manhattan=  new L.LayerGroup();
let Monroe=  new L.LayerGroup();
let Montgomery=  new L.LayerGroup();
let Nassau=  new L.LayerGroup();
let Niagara=  new L.LayerGroup();
let Oneida=  new L.LayerGroup();
let Onondaga=  new L.LayerGroup();
let Ontario=  new L.LayerGroup();
let Orange=  new L.LayerGroup();
let Orleans=  new L.LayerGroup();
let Oswego=  new L.LayerGroup();
let Otsego=  new L.LayerGroup();
let Putnam=  new L.LayerGroup();
let Queens=  new L.LayerGroup();
let Rensselaer=  new L.LayerGroup();
let Rockland=  new L.LayerGroup();
let Saratoga=  new L.LayerGroup();
let Schenectady=  new L.LayerGroup();
let Schoharie=  new L.LayerGroup();
let Schuyler=  new L.LayerGroup();
let Seneca=  new L.LayerGroup();
let StLawrence=  new L.LayerGroup();
let StatenIsland=  new L.LayerGroup();
let Steuben=  new L.LayerGroup();
let Suffolk=  new L.LayerGroup();
let Sullivan=  new L.LayerGroup();
let Tioga=  new L.LayerGroup();
let Tompkins=  new L.LayerGroup();
let Ulster=  new L.LayerGroup();
let Warren=  new L.LayerGroup();
let Washington=  new L.LayerGroup();
let Wayne=  new L.LayerGroup();
let Westchester=  new L.LayerGroup();
let Wyoming=  new L.LayerGroup();
let Yates=  new L.LayerGroup();

let overlayMaps = {
    "Albany":Albany,
    "Allegany": Allegany,
    "Bronx": Bronx,
    "Brooklyn":Brooklyn,
    "Broome":Broome,
    "Cattaraugus":Cattaraugus,
    "Cayuga":Cayuga,
    "Chautauqua":Chautauqua,
    "Chemung":Chemung,
    "Chenango":Chenango,
    "Clinton":Clinton,
    "Columbia":Columbia,
    "Cortland":Cortland,
    "Delaware":Delaware,
    "Dutchess":Dutchess,
    "Erie":Erie,
    "Essex":Essex,
    "Franklin":Franklin,
    "Fulton":Fulton,
    "Genesee":Genesee,
    "Greene":Greene,
    "Hamiliton":Hamiliton,
    "Herkimer":Herkimer,
    "Jefferson":Jefferson,
    "Lewis":Lewis,
    "Livingston":Livingston,
    "Madison":Madison,
    "Manhattan":Manhattan,
    "Monroe":Monroe,
    "Montgomery":Montgomery,
    "Nassau":Nassau,
    "Niagara":Niagara,
    "Oneida":Oneida,
    "Onondaga":Onondaga,
    "Ontario":Ontario,
    "Orange":Orange,
    "Orleans":Orleans,
    "Oswego":Oswego,
    "Otsego":Otsego,
    "Putnam":Putnam,
    "Queens":Queens,
    "Rensselaer":Rensselaer,
    "Rockland": Rockland,
    "Saratoga":Saratoga,
    "Schenectady":Schenectady,
    "Schoharie":Schoharie,
    "Schuyler":Schuyler,
    "Seneca":Seneca,
    "St. Lawrence":StLawrence,
    "Staten Island": StatenIsland,
    "Steuben":Steuben,
    "Suffolk":Suffolk,
    "Sullivan":Sullivan,
    "Tioga":Tioga,
    "Tompkins":Tompkins,
    "Ulster":Ulster,
    "Warren":Warren,
    "Washington":Washington,
    "Wayne":Wayne,
    "Westchester":Westchester,
    "Wyoming":Wyoming,
    "Yates":Yates
};
L.control.layers(baseMaps,overlayMaps,{
    collapsed:true
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
            const county = point.county;

            // Create a marker and add it to the county's layer group
            L.marker([parseFloat(point.latitude), parseFloat(point.longitude)])
                .bindPopup(`<h3>Facility Name: ${point.facility_name}</h3><br><h4>County: ${county}</h4><br><h4>Status: ${point.facility_status}</h4>`)
                .addTo(overlayMaps[county]); // Add to the corresponding LayerGroup
            console.log(`County: ${county}`);
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
                