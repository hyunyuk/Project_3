

// Create Map
let myMap = L.map("map", {
    center: [42.9531, -75.5268],
    zoom: 6
    });
        
// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Add title to the map
    var mapTitle = L.control();
    mapTitle.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'map-title');
    div.innerHTML = '<h4>New York State Child Care Facilities</h4>';
    return div;
};
mapTitle.addTo(myMap);
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
              .bindPopup(`<h2>Facility Name:<br> ${point.facility_name}</h2><hr><p><b>County:</b> 
              ${point.county}<br><b>Status:</b> ${point.facility_status }<br><b>Total Capacity:</b>
              ${point.total_capacity} <br><b>For More Info:</b> <a href = "${point.additional_information.url}"> Click Here</a></p>`);
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//         CREATE THE MAP                 //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
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
div2.innerHTML = '<h4>New York State Child Care Facilities by Status</h4>';
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

