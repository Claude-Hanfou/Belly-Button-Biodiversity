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