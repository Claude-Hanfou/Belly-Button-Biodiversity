// Begining of the code below


//Append names to the dropdown by reading the json file and appending it
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    console.log(sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

// Create a function to update the plots when a new id is selected
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildBarChart(newSample);

} 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(key.toUpperCase() + ': ' + value); 
    })


  });
}





// // Start by reading the json file 





url = "../../../data/samples.json"




// function buildBarChart(sample) {
//   d3.json("samples.json").then((data) => {
//     var resultArray = data
//     .samples
//     .filter(sampleObj => {
//       return sampleObj.id == sample
//     });

    




//     // Grab values from the data json object to build the plots
    
//     // var sampleValues = data.samples;
//     // console.log(sampleValues)

//     // var samplesResult = sampleValues.filter(sampleVal => {return sampleVal.id == sample})
//     // console.log(samplesResult)

//     // var result = metadata.filter(sampleObj => sampleObj.id == sample);
    
   
    

     





    
// //     // var otuId = data['samples'][0]['otu_ids']
// //     // console.log(otuId)

// //     // var text = data['samples'][0]['otu_labels']
// //     // console.log(text)

    


//     console.log(data)

   
// //           // var sample = data.samples;


// //           // var stock = data.dataset.dataset_code;
          
      
// //           // console.log(data)
      
// //           // var trace1 = {
// //           //   type: "barer",
// //           //   x: 
// //           //   y: 
// //           //   orientation: "h"
// //           // };
      
// //           // var data = [trace1];

// //           // var layout = {
// //           //   title: "Bar",
// //           //   margin: {
// //           //     l: 100,
// //           //     r: 100,
// //           //     t: 100,
// //           //     b: 100
// //           //   }
// //           // };
      
// //           // Plotly.newPlot("plot", data, layout);
      
//   // });
// }
// buildPlot ();


function buildBarChart(sample) {
  d3.json("samples.json").then((data) => {
    var resultArray = data
    .samples
    .filter(sampleObj => {
      return sampleObj.id == sample
    });
    
    var result = resultArray[0];
    console.log(result);
    var top_ten_otu_ids = result.otu_ids.slice(0, 10).map(numericIds => {
      return 'OTU ' + numericIds;
    }).reverse();
    
    var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
    var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();
    
    var bar_trace = [
      {
        x: top_ten_sample_values,  
        y: top_ten_otu_ids,
        text: top_ten_otu_labels,
        name: "Top 10",
        type: 'bar',
        orientation: 'h'
      }
      ];

      var data = [bar_trace];

      var bar_layout = {
        title: "Top 10 OTUs",
   
      };
      
      Plotly.newPlot('bar', bar_trace, bar_layout)
    
    });
  }