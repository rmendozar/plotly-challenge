
var url = "samples.json";

var coso = {};

d3.json(url).then(function(data){
    let CHART = d3.selectAll("#bar").node();
    console.log(data)
    var sample_data = data.samples.map(d=>d);
    console.log(sample_data[0]);
    var select_values = sample_data.map(d=>d.id);
    var sample_values = sample_data[0].sample_values.slice(0,10);
    var sample_labels_values = sample_data[0].otu_ids.slice(0,10);
    var sample_labels = sample_labels_values.map(d=>"OTU "+d);
    console.log(sample_labels);
    var sample_hovertext = sample_data[0].otu_labels.slice(0,10);
    console.log(sample_hovertext);

    dataChart = [{
      x:sample_values,
      y:sample_labels,
      type:"bar",
      orientation: 'h',
      hovertext:sample_hovertext
    }];
    
    // Print the chart
    
    Plotly.newPlot(CHART,dataChart);

    var bubleChart = [{
      x: sample_data[0].otu_ids,
      y: sample_data[0].sample_values,
      text: sample_data[0].otu_labels,
      mode: 'markers',
      marker: {
          color: sample_data[0].otu_ids,
          size: sample_data[0].sample_values
      }
    }];

    var bubleLayout = {
      title: 'Bubble chart for each sample',
      showlegend: false,
      height: 600,
      width: 1400
    };
    Plotly.newPlot('bubble', bubleChart, bubleLayout);

    console.log(data.metadata[0].id)
    console.log(data.metadata[0].ethnicity)
    console.log(data.metadata[0].gender)
    console.log(data.metadata[0].age)
    console.log(data.metadata[0].location)
    console.log(data.metadata[0].bbtype)
    console.log(data.metadata[0].wfreq)
    //id: 940
    //Ethinicity: Caucasian
    //Gender: F
    //Age: 24
    //Location: Beaufort/NYC
    //bbtype: I
    //wfreq: 2
   // var table = document.getElementById("demo");
   
   var metadata = data.metadata;    
   // Filter the data for the object with the desired sample number    
   //var resultArray = metadata.filter(d => d.id == sample);    
   var result = metadata[0];    
   // Use d3 to select the panel with id of `#sample-metadata`    
   var PANEL = d3.select("#sample-metadata");
   // Use `.html(“”) to clear any existing metadata    
   PANEL.html("");
   // Use `Object.entries` to add each key and value pair to the panel    
   // Hint: Inside the loop, you will need to use d3 to append new    
   // tags for each key-value in the metadata.    
     Object.entries(result).forEach(([key, value]) => {      
       PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
     })
 

    var select = document.getElementById("selDataset");
    for(index in select_values) {
        select.options[select.options.length] = new Option(select_values[index], index)
    }

})


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change",updatePlotly);
  
// This function is called when a dropdown menu item is selected
function updatePlotly(){
  d3.json(url).then(function(data){  //  alert("Ok");
// Use D3 to select the dropdown menu

  let CHART = d3.selectAll("#bar").node();
  let dropdownMenu = d3.select("#selDataset")
  
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.node().value;
  //console.log(dataset);

  //console.log("/////////////////////////////////////////////////////////////");
  
  // Initialize x and y arrays
  var sample_data = data.samples.map(d=>d);
    //console.log(sample_data[dataset]);
    var select_values = sample_data.map(d=>d.id);
    var sample_values = sample_data[dataset].sample_values.slice(0,10);
    var sample_labels_values = sample_data[dataset].otu_ids.slice(0,10);
    var sample_labels = sample_labels_values.map(d=>"OTU "+d);
    //console.log(sample_labels);
    var sample_hovertext = sample_data[dataset].otu_labels.slice(0,10);
    //console.log(sample_hovertext);

    dataChart = [{
      x:sample_values,
      y:sample_labels,
      type:"bar",
      orientation: 'h',
      hovertext:sample_hovertext
    }];

    coso.dataChart = dataChart;
    
    // Print the chart
    
    Plotly.newPlot(CHART,dataChart);

    var bubleChart = [{
      x: sample_data[dataset].otu_ids,
      y: sample_data[dataset].sample_values,
      text: sample_data[dataset].otu_labels,
      mode: 'markers',
      marker: {
          color: sample_data[dataset].otu_ids,
          size: sample_data[dataset].sample_values
      }
    }];

    var bubleLayout = {
      title: 'Bubble chart for each sample',
      showlegend: false,
      height: 600,
      width: 1400
    };
    Plotly.newPlot('bubble', bubleChart, bubleLayout);
    var metadata = data.metadata;    
    // Filter the data for the object with the desired sample number    
    //var resultArray = metadata.filter(d => d.id == sample);    
    var result = metadata[dataset];    
    // Use d3 to select the panel with id of `#sample-metadata`    
    var PANEL = d3.select("#sample-metadata");
    // Use `.html(“”) to clear any existing metadata    
    PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel    
    // Hint: Inside the loop, you will need to use d3 to append new    
    // tags for each key-value in the metadata.    
      Object.entries(result).forEach(([key, value]) => {      
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      })
  });
}
