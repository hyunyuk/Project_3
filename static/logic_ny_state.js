// Create the Facilities by County Map

// Create Map
let myMap = L.map("map", {
    center: [42.9531, -75.5268],
    zoom: 6
    });
        
// Add tile layer
let streetmap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Add title to the map
var mapTitle = L.control();
mapTitle.onAdd = function (map) {
var div = L.DomUtil.create('div', 'map-title');
div.innerHTML = '<h4>Child Care Facilities by County</h4>';
return div;
};
mapTitle.addTo(myMap);

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
                .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`)
                .addTo(overlayMaps[county]); // Add to the corresponding LayerGroup
            console.log(`County: ${county}`);
        }
    });
}
 //Create the Facilities Count by County Bar Chart       
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
// Create the Summary Table    
var url = "https://data.ny.gov/resource/fymg-3wv3.json";

d3.json(url).then(function (data) {
    console.log(data);
    populateCountyOptions(data);

    var defaultCounty = data.length > 0 ? data[0].county : null;
    updateCapacities(defaultCounty, data);
});

function populateCountyOptions(jsonData) {
    var countySelect = d3.select("#countySelect"); 
    var uniqueCounties = Array.from(new Set(jsonData.map(facility => facility.county)));

    uniqueCounties.forEach(function (county) {
        countySelect
            .append("option")
            .attr("value", county)
            .text(county);
    });

    countySelect.on("change", function () {
        var newCounty = d3.select(this).property("value");
        updateCapacities(newCounty, jsonData);
    });
}

function updateCapacities(newCounty, jsonData) {
    console.log("Updating capacities for county:", newCounty);
    // Filter facilities based on the selected county
    console.log(jsonData);

    var countyFacilities = jsonData.filter(function (facility) {
        return facility.county === newCounty;
    });
    console.log("County array:", countyFacilities);
    // Calculate total capacities
    var totalInfantCapacity = countyFacilities.reduce(function (sum, facility) {
        return sum + parseInt(facility.infant_capacity);
    }, 0);

    var totalToddlerCapacity = countyFacilities.reduce(function (sum, facility) {
        return sum + parseInt(facility.toddler_capacity);
    }, 0);

    var totalPreschoolCapacity = countyFacilities.reduce(function (sum, facility) {
        return sum + parseInt(facility.preschool_capacity);
    }, 0);

    var totalSACCCapacity = countyFacilities.reduce(function (sum, facility) {
        return sum + parseInt(facility.school_age_capacity);
    }, 0);

    var totalcapacity = countyFacilities.reduce(function (sum, facility) {
        return sum + parseInt(facility.total_capacity);
    }, 0);

    // Update the list with total capacities
    var capacitiesList = document.getElementById("capacitiesList");
    capacitiesList.innerHTML = `
        <li>Total Infant Capacity: ${totalInfantCapacity}</li>
        <li>Total Toddler Capacity: ${totalToddlerCapacity}</li>
        <li>Total Preschool Capacity: ${totalPreschoolCapacity}</li>
        <li>Total SACC Capacity: ${totalSACCCapacity}</li>
        <li>Total Capacity: ${totalcapacity}</li>
    `;
}

function optionChanged(newCounty) {
    // Handle any additional logic if needed
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//         CREATE THE STATUS MAP                 //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
let myMap2 = L.map("map2", {
center: [42.9531, -75.5268],
zoom: 6
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//         CREATE THE MAP TILES           //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Add tile layer
let streetmap2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap2);

// Add title to the map
var mapTitle2 = L.control();
mapTitle2.onAdd = function (map) {
var div2 = L.DomUtil.create('div', 'map-title2');
div2.innerHTML = '<h4>Child Care Facilities by License and Registration Status</h4>';
return div2;
};
mapTitle2.addTo(myMap2);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//        SETTING THE OPTIONS BOX         //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Create a baseMaps object to hold the streetmap AND the topographic map layers.
let baseMaps2 = {
    "Street Map": streetmap2,
//    "Topographic Map": topo2
    };

let childCareLocations = new L.LayerGroup();
let licensedLocations = new L.LayerGroup();
let registeredLocations = new L.LayerGroup();
let pendingRevocationLocations = new L.LayerGroup();
let pendingDenialLocations = new L.LayerGroup();
let pendingRevocationANDDenial = new L.LayerGroup();
let suspendedLocations = new L.LayerGroup();

// Create an overlayMaps object to hold the Child Care locations layer.
let overlayMaps2 = {
    "Child Care Locations": childCareLocations,
    "Licensed Child Care Facilities": licensedLocations,
    "Registered Child Care Facilities": registeredLocations,
    "Pending Revocation Facilities": pendingRevocationLocations,
    "Pending Denial Facilities": pendingDenialLocations,
    "Pending Revocation and Denial Facilities": pendingRevocationANDDenial,
    "Suspended Facilities": suspendedLocations
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//      CREATE THE CONTROLLER LAYER       //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
L.control.layers(baseMaps2, overlayMaps2, {
    collapsed: true
}
).addTo(myMap2);

// ------------------------------------------------------------------ //
//                   READING OUR DATA - USING D3                      //
// ------------------------------------------------------------------ //
d3.json(url).then(function (data) {
    console.log(data);
    
    addMarkers2(data);
    addExtraMarkers2(data)
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//       Function FOR MARKER COLOR        //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Marker Color based on Facility Status.
function markerColor(status) {
    if (status === "License") return "#90EE90";   // light green
    else if (status === "Registration") return "#dfff00";  // Chartreuse
    else if  (status === "Pending Revocation") return "#FFD580"; // Light Orange
    else if (status === "Pending Denial") return "#FFBF00"; // Amber
    else if (status === "Pending Revocation and Denial") return "#F88379"; // Coral Pink
    else return "#FF0000"; // RED // OR "#FF5733" // for Suspended
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//        Function FOR MARKER SIZE        //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Marker Size based on Total Capacity.
function markerSize(capacity){
if (capacity == 0 ) {
    return 1;
}
return capacity / 8;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//       Function FOR MARKER STYLE        //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
function markerOption(features){  
    // console.log(features.facility_status);
return {                        
    fillColor : markerColor(features.facility_status),
    color: "black",   
    // radius: markerSize(features.total_capacity),
    stroke: true, 
    weight: 0.5,
    opacity: 1
};
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//         DISPLAYING THE MARKERS         //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Function to add markers to the map
function addMarkers2(data) {
    data.forEach((point) => {

        // Check if the entry has latitude and longitude information
        if (point.latitude && point.longitude) {

            // Create a marker and add it to the map
            L.circleMarker([point.latitude, point.longitude], markerOption(point))
                .addTo(childCareLocations)
                .bindPopup(`<h2>Facility Name: ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
        }
    });
}
// --------------------------------------------------------------------------
// Another Function to add filtered markers to the map
function addExtraMarkers2(data) {
    data.forEach((point) => {

        // Check if the entry has latitude and longitude information
        if (point.latitude && point.longitude) {
            if (point.facility_status === "License") {

                // Create a marker and add it to the map
                L.circleMarker([point.latitude, point.longitude], markerOption(point))
                    .addTo(licensedLocations)
                    .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
            }

            else if (point.facility_status === "Registration") {
                // Create a marker and add it to the map
                L.circleMarker([point.latitude, point.longitude], markerOption(point))
                    .addTo(registeredLocations)
                    .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
            }

            else if (point.facility_status === "Pending Revocation") {
                // Create a marker and add it to the map
                L.circleMarker([point.latitude, point.longitude], markerOption(point))
                    .addTo(pendingRevocationLocations)
                    .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
            }

            else if (point.facility_status === "Pending Denial") {
                // Create a marker and add it to the map
                L.circleMarker([point.latitude, point.longitude], markerOption(point))
                    .addTo(pendingDenialLocations)
                    .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
            }
            
            else if (point.facility_status === "Pending Revocation and Denial") {
                // Create a marker and add it to the map
                L.circleMarker([point.latitude, point.longitude], markerOption(point))
                    .addTo(pendingRevocationANDDenial)
                    .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
            }

            else if (point.facility_status === "Suspended") {
                // Create a marker and add it to the map
                L.circleMarker([point.latitude, point.longitude], markerOption(point))
                    .addTo(suspendedLocations)
                    .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
                    ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
                    ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
            }
            

        }
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//             CREATE A LEGEND            //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
let legend = L.control({position: "bottomright"});
legend.onAdd = function() {

    let div = L.DomUtil.create("div", "info legend");
    let facilityStatus = ["License", "Registration", "Pending Revocation", "Pending Denial",
                            "Pending Revocation and Denial", "Suspended"];
    let colors = ["#90EE90", "#dfff00", "#FFD580", "#FFBF00", "#F88379", "#FF0000"];

    // Loop through the depth Intervals and generate a label with a colored square for each interval.      
    for (let i = 0; i < facilityStatus.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            facilityStatus[i] + (facilityStatus[i] ? "" + "<br>" : "+");
    }
        return div;
};

legend.addTo(myMap2);

//initialize Masonry
$(document).ready(function () {
    // Initialize Masonry
    $('.grid-container').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      horizontalOrder: true
    });
});
