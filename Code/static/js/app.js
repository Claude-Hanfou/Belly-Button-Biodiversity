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

    .then(function(data) {
        console.log(data);
    });






