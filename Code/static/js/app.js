// Begining of the code below



// Create a function to unpact the json data

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }



// Start by reading the json file 

fetch("samples.json")
    .then(function(resp) {
        return resp.json();
    })

    .then(result => {
        jsonFileData = result;
      });


console.log(jsonFileData)

function buildPlot() {
    
 

       // Grab values from the data json object to build the plots
        //   var sample = data.samples;


        //   var stock = data.dataset.dataset_code;
          
      
        //   console.log(data)
      
        //   var trace1 = {
        //     type: "barer",
        //     x: 
        //     y: 
        //     orientation: "h"
        //   };
      
        //   var data = [trace1];

        //   var layout = {
        //     title: "Bar",
        //     margin: {
        //       l: 100,
        //       r: 100,
        //       t: 100,
        //       b: 100
        //     }
        //   };
      
        //   Plotly.newPlot("plot", data, layout);
      
        }
      
      
      buildPlot(); 




