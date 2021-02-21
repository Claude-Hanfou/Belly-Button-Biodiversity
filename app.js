// Begining of the code below


//Here we want to add the ID's to the dropdowm,looking at the html we want to create options for each id
//we select the dropdown area and then call the json data method
//we extrat the names from the data(id)
//for each id we want to append that to the selector
//create a function and refrence the selector, we append option which will allow us to select different elements
//add the text which are the various ids
//the property and value name adds a value for each and is referncing each name

function init() {
  var selector = d3.select("#selDataset");
  console.log(selector)

  d3.json("samples.json").then((data) => {
    console.log(data);
    var names = data.names;
    console.log(names);
    names.forEach((name) => {
      selector  
        .append("option")
        .text(name)
        .property("value", name);
       
    })

})}
init();




// // Create a function to update the plots when a new id is selected
//each function will take a new sample parameter to update the plots and the metadata
//the functions are created below and are not called, they are referenceed above and updated when called with the new sample

function optionChanged(newSample) {
  buildMetadata(newSample);
//   buildBarChart(newSample);
//   buildBubbleChart(newSample);

} 

//To get the demographic info when we select the dropdowm, we need to use sample which is going to be updated when the id is changed.
//we make the sample  equal to the id so that it changes when that it selected
//We take the first result at 0 since that is the values we want to populate
//It is always going to be zero because when we select it,it only returns one at the time, and that is what we want to plot

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {

    metadata = data.metadata
    console.log(metadata)

    var metaResult = metadata.filter(meta => meta.id == sample)
    var results = metaResult[0]
    console.log(results)
    var panel = d3.select("#sample-metadata");
    panel.html("");

      Object.entries(results).forEach(([key, value]) => {

        panel.append("h6").text(key + ": " + value)
        
        console.log(`Key: ${key} and Value ${value}`);
     
    });

    console.log(results);

})}





// // function buildBarChart(sample) {
// //   d3.json("samples.json").then((data) => {
// //     var resultArray = data
// //     .samples
// //     .filter(sampleObj => {
// //       return sampleObj.id == sample
// //     });

    




// //     // Grab values from the data json object to build the plots
    
// //     // var sampleValues = data.samples;
// //     // console.log(sampleValues)

// //     // var samplesResult = sampleValues.filter(sampleVal => {return sampleVal.id == sample})
// //     // console.log(samplesResult)

// //     // var result = metadata.filter(sampleObj => sampleObj.id == sample);
    
   
    

     





    
// // //     // var otuId = data['samples'][0]['otu_ids']
// // //     // console.log(otuId)

// // //     // var text = data['samples'][0]['otu_labels']
// // //     // console.log(text)

    


// //     console.log(data)

   
// // //           // var sample = data.samples;


// // //           // var stock = data.dataset.dataset_code;
          
      
// // //           // console.log(data)
      
// // //           // var trace1 = {
// // //           //   type: "barer",
// // //           //   x: 
// // //           //   y: 
// // //           //   orientation: "h"
// // //           // };
      
// // //           // var data = [trace1];

// // //           // var layout = {
// // //           //   title: "Bar",
// // //           //   margin: {
// // //           //     l: 100,
// // //           //     r: 100,
// // //           //     t: 100,
// // //           //     b: 100
// // //           //   }
// // //           // };
      
// // //           // Plotly.newPlot("plot", data, layout);
      
// //   // });
// // }
// // buildPlot ();

// // Grab values from the data json object to build the bar plot
// function buildBarChart(sample) {
//   d3.json("samples.json").then((data) => {
//     var resultArray = data
//     .samples
//     .filter(sampleObj => {
//       return sampleObj.id == sample
//     });
    
//     var result = resultArray[0];
//     console.log(result);
//     var top_ten_otu_ids = result.otu_ids.slice(0, 10).map(numericIds => {
//       return 'OTU ' + numericIds;
//     }).reverse();
//     console.log(top_ten_otu_ids)
    
//     var top_ten_sample_values = result.sample_values.slice(0, 10).reverse();
//     console.log(top_ten_sample_values);
    
//     var top_ten_otu_labels = result.otu_labels.slice(0, 10).reverse();
    

//     var bar_trace = [
//       {
//         x: top_ten_sample_values,  
//         y: top_ten_otu_ids,
//         text: top_ten_otu_labels,
//         name: "Top 10",
//         type: 'bar',
//         orientation: 'h'
//       }
//       ];

//       var data = [bar_trace];

//       var bar_layout = {
//         title: "Top 10 OTUs",
   
//       };
      
//       Plotly.newPlot('bar', bar_trace, bar_layout)
    
//     });
//   }


























// // Grab values from the data json object to build the bubble plot
// function buildBubbleChart(sample) {
//   d3.json("samples.json").then((data) => {
//     var resultArray = data
//     .samples
//     .filter(sampleObj => {
//       return sampleObj.id == sample
//     });
    
//     //get values that will display on the bubble chart when the id is selected

//     var result = resultArray[0]
//     console.log(result)

//     // use reverse on the variable due to plotly default order

//     var otuResult = result.otu_ids.map(numericIds => {
//       return numericIds;
//     }).reverse();
//     console.log(otuResult)

//     var sampleValues = result.sample_values.reverse();

//     var labels = result.otu_labels.reverse();

//     //use values to plot bubble chart





//     var bubble_trace = {
//       x:otuResult, 
//       y: sampleValues, 
//       text: labels, 
//       mode: 'markers',
//       marker: {
//         color: otuResult,
//         size: sampleValues 
//       }
//     };
    
//     var data = [bubble_trace];
    
//     var layout = {
//       title: 'OTU ID',
//       showlegend: false,
     
//     };
    
//     Plotly.newPlot('bubble', data, layout);
   



    
//     });
//   }