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
  buildBarChart(newSample);
  buildGauge(newSample);
  buildBubbleChart(newSample);

} 

//To get the demographic info when we select the dropdowm, we need to use sample which is going to be updated when the id is changed.
//we make the sample  equal to the id so that it changes when that it selected
//We take the first result at 0 since that is the values we want to populate
//It is always going to be zero because when we select it,it only returns one at the time, and that is what we want to plot

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {

    var metadata = data.metadata
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




// Grab values from the data json object to build the bar plot. The data is storred in one variable

function buildBarChart(sample) {
  d3.json("samples.json").then((data) => {

    var sampleValues = data
    .samples
    .filter(sampleVal => {
      return sampleVal.id == sample
    });

    console.log(sampleValues)
  

    var results = sampleValues[0]
    console.log(results);

    var otuId = results.otu_ids.slice(0,10).map(otu=> { return "OTU" + otu}).reverse()
    var samples = results.sample_values.slice(0,10).reverse()
    var labels = results.otu_labels.slice(0,10).reverse()

      
    var trace1 = {
      type: "bar",
      x: samples,
      y: otuId ,
      text: labels,
      name: "Top 10",
      orientation: "h"
          };
      
    var data = [trace1];

    var layout = {
      title: "Top 10 OTUs",
       
    }
      
    Plotly.newPlot("bar", data, layout);
      
  })

}


function buildGauge(sample) {
  // Enter the washing frequency between 0 and 180
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata
    .filter(sampleObj => {
      return sampleObj.id == sample
    });
    console.log(resultArray);

    var result = resultArray[0];
    console.log(result);
    var wash_freq = result.wfreq;
    console.log(wash_freq);
    
    var level = wash_freq
    console.log(level);

    

        
        // Trig to calc meter point
    var degrees = 9 - level,
    radius = .5;
    var radians = degrees * Math.PI / 9;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 10, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'},

      { values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7', '7-8', '8-9'],
        direction: 'clockwise',
        textinfo: 'text',
        textposition:'inside',	  
        marker: {colors:[ 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
        'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
        'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                  // the rest of the chart in white color
                  '#FFB6C1	', '#FFC0CB	', '#FAEBD7	', 'white' ],
                labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7', '7-8', '8-9'],},
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false 
    }];

    var layout = {
        shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000' 
      }
    }],
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        // height: 1000,
        // width: 1000,
        xaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]}
        };

    Plotly.newPlot('gauge', data, layout);
})

}




// var degrees = 9 - level;
// var radius = .5;
// var radians = (degrees * Math.PI) / 9;
// var x = radius * Math.cos(radians);
// var y = radius * Math.sin(radians);

// // Path: may have to change to create a better triangle
// var mainPath = "M -.0 -0.05 L .0 0.05 L ",
// var pathX = String(x),
// var space = " ",
// var pathY = String(y),
// var pathEnd = " Z",
// var path = mainPath.concat(pathX, space, pathY, pathEnd)

// var data = [
//   {
//     type: "scatter",
//     x: [0],
//     y: [0],
//     marker: { size: 10, color: "850000" },
//     showlegend: false,
//     name: "Freq",
//     text: level,
//     hoverinfo: "text+name"
//   },
//   {
//     values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//     rotation: 90,
//     text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7', '7-8', '8-9'],
//     textinfo: "text",
//     textposition: "inside",
//     direction: 'clockwise',
//     marker: {
//       colors: [
//         "rgba(0, 105, 11, .5)",
//         "rgba(10, 120, 22, .5)",
//         "rgba(14, 127, 0, .5)",
//         "rgba(110, 154, 22, .5)",
//         "rgba(170, 202, 42, .5)",
//         "rgba(202, 209, 95, .5)",
//         "rgba(210, 206, 145, .5)",
//         "rgba(232, 226, 202, .5)",
//         "rgba(240, 230, 215, .5)",
//         "rgba(255, 255, 255, 0)"
//       ]
//     },
//     labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7', '7-8', '8-9'],
//     hoverinfo: "label",
//     hole: .5,
//     type: "pie",
//     showlegend: false
//   }
// ];

// var layout = {
//   shapes: [
//     {
//       type: "path",
//       path: path,
//       fillcolor: "850000",
//       line: {
//         color: "850000"
//       }
//     }
//   ],
//   title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
//   // height: 500,
//   // width: 500,
//   xaxis: {
//     zeroline: false,
//     showticklabels: false,
//     showgrid: false,
//     range: [-1, 1]
//   },
//   yaxis: {
//     zeroline: false,
//     showticklabels: false,
//     showgrid: false,
//     range: [-1, 1]
//   }
// };






















// Grab values from the data json object to build the bubble plot
function buildBubbleChart(sample) {
  d3.json("samples.json").then((data) => {
    var resultArray = data
    .samples
    .filter(sampleObj => {
      return sampleObj.id == sample
    });
    
    //get values that will display on the bubble chart when the id is selected

    var result = resultArray[0]
    console.log(result)

    // use reverse on the variable due to plotly default order

    var otuResult = result.otu_ids.map(numericIds => {
      return numericIds;
    }).reverse();
    console.log(otuResult)

    var sampleValues = result.sample_values.reverse();

    var labels = result.otu_labels.reverse();

    //use values to plot bubble chart



    var bubble_trace = {
      x:otuResult, 
      y: sampleValues, 
      text: labels, 
      mode: 'markers',
      marker: {
        color: otuResult,
        size: sampleValues 
      }
    };
    
    var data = [bubble_trace];
    
    var layout = {
      title: 'OTU ID',
      showlegend: false,
     
    };
    
    Plotly.newPlot('bubble', data, layout);
  
    
    });
  }