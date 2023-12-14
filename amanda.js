url="https://data.ny.gov/resource/fymg-3wv3.json"
d3.json(url).then(function(data) {
    console.log(data[0].county);
  });
  

function init(){
    let dropdownMenu = d3.select("#selDataset");
    d3.json("https://data.ny.gov/resource/fymg-3wv3.json").then(function(data) {
        
        for (let i = 0; i <= data.length; i++){
            let county_names = data[0].county;
            console.log(county_names);
            //use d3 to select dropdown menu
            let dropdownMenu = document.getElementById('selDataset');
            //use d3 to select dropdown menu
            let option = document.createElement('option')
           option.text=county_names;
           option.value=county_names;
           dropdownMenu.append(option);

        };
    
      
        // Use the first sample from the list to build the initial plots
        // let firstSample = county_names[0];
        buildMetadata("Wayne");
    });
};


function buildMetadata(sample){
    d3.json("https://data.ny.gov/resource/fymg-3wv3.json").then((data) => {
    //retrieve counts of infant_capacity, toddler_capacity, total_capacity, 
    //preschool_capacity, and school_age_capacity for each county
    let infantCount = 0;
    let toddlerCount=0;
    let preschoolCount=0;
    let schoolageCount=0;
    let totalCount=0;

    for (let i = 0; i <= 6; i++){
        if (data[i].county == sample){
            infantCount= infantCount+data[i].infant_capacity;
            toddlerCount= toddlerCount+data[i].toddler_capacity;
            preschoolCount=preschoolCount+data[i].preschool_capacity;
            schoolageCount=schoolageCount+data[i].school_age_capacity;
            totalCount=totalCount+data[i].total_capacity;
        }
    
    }
        console.log(infantCount)
        console.log(toddlerCount);
        console.log(preschoolCount);
        console.log[schoolageCount];
        console.log(totalCount);
    
        let allCounts = new Array(infantCount, toddlerCount, preschoolCount, schoolageCount, totalCount);

        let results= allCounts.filter(id => option == sample)
        let first_result = results[0];
        console.log(first_result);
        
        Object.entries(first_result).forEach(([key,value]) => {
            console.log(key,value);
            //select the demographic info
            d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
        });

    });
};
    
init();  

