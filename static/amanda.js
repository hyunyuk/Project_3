

var url = "https://data.ny.gov/resource/fymg-3wv3.json";

d3.json(url).then(function (data) {
    console.log(data[0].county);
    populateCountyOptions(data);
    updateCapacities(data);
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

function updateCapacities(selectedCounty, jsonData) {
    console.log("Updating capacities for county:", selectedCounty);
    // Filter facilities based on the selected county
    var countyFacilities = jsonData.filter(function (facility) {
        return facility.county === selectedCounty;
    });

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

function optionChanged(selectedCounty) {
    //
}
