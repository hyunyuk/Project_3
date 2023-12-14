function init(){
    let dropdownMenu = d3.select("#selDataset");
    d3.json("https://data.ny.gov/resource/fymg-3wv3.json").then(function(data) {
        
        for (let i = 0; i <= data.length; i++){
            let county_names = data[i].county;
            console.log(county_names);
            //use d3 to select dropdown menu
            let dropdownMenu = document.getElementById('selDataset');
            //use d3 to select dropdown menu
            let option = document.createElement('option')
           option.text=county_names;
           option.value=county_names;
           dropdownMenu.append(option);

        }
    
      
        // Use the first sample from the list to build the initial plots
        // let firstSample = county_names[0];
        buildMetadata("Wayne");
    });
};
init()

function buildMetadata(sample){
    d3.json("https://data.ny.gov/resource/fymg-3wv3.json").then((data) => {
    //retrieve counts of infant_capacity, toddler_capacity, total_capacity, 
    //preschool_capacity, and school_age_capacity for each county
    let infantCount = 0;
    let toddlerCount=0;
    let preschoolCount=0;
    let schoolageCount=0;
    let totalCount=0;

    for (let i = 0; i <= 3; i++){
        if (data[i].county == sample){
            infantCount= infantCount+data[i].infant_capacity;
            toddlerCount= toddlerCount+data[i].toddler_capacity;
            preschoolCount=preschoolCount+data[i].preschool_capacity;
            schoolageCount=schoolageCount+data[i].school_age_capacity;
            totalCount=totalCount+data[i].total_capacity;
        }
        console.log(infantCount);
    }
    
    

    });
};

        
    
//         //filter based on county 
//         let value = capacityCounts.filter(id => id.id == firstSample);
    
//         //log the array
//         console.log(value);
    
//         // Get the first index from the array
//         let valueData = value[0];
    
//         // Clear out metadata
//         d3.select("#sample-metadata").html("");
    
//         // Use Object.entries to add each key/value pair to the panel
//         Object.entries(valueData).forEach(([key,value]) => {
    
//         // Log the individual key/value pairs as they are being appended to the metadata panel
//         console.log(key,value);
    
//         let PANEL = d3.select("#sample-metadata");
        
//         for (key in valueData){
//             PANEL.append("h5").text(`${key}: ${value}`)
//           };
//         });
//     }); 
 











  

//   //filter based on county 
//   let value = capacityCounts.filter(id => id.id == sample);

//   //log the array
//   console.log(value);

//   // Get the first index from the array
//   let valueData = value[0];

//   // Clear out metadata
//   d3.select("#sample-metadata").html("");

//   // Use Object.entries to add each key/value pair to the panel
//   Object.entries(valueData).forEach(([key,value]) => {

//     // Log the individual key/value pairs as they are being appended to the metadata panel
//     console.log(key,value);

//     d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
//   });
// }); 




// }


