function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  
  // Use `d3.json` to fetch the metadata for a sample
  var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
  panel.html("")
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(`/metadata/${sample}`).then(function(data) {
    console.log(data);
    // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(data).forEach(([key, value]) => {
      console.log(`key: ${key}, value: ${value}`);
        panel.append("li").text(`${key}: ${value}`);
      });
      var WFREQ = data.WFREQ;
      console.log(WFREQ);
    });
} 
    
//function buildGauge()   
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart


    // buildGauge(data.WFREQ);


function buildCharts(sample) {

  var bubble = d3.select("#bubble");
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(data) {
    console.log(data);
    var otuIds = data.otu_ids;
    var sampleValues = data.sample_values;
    var textValues = data.otu_labels;
    
    var trace1 = {
      x: otuIds,
      y: sampleValues,
      text: textValues,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleValues
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: `Sample: ${sample}`,
      showlegend: false,
      height: 600,
      width: 1300
    };
    
    Plotly.newPlot("bubble", data, layout);

  
 
    // @TODO: Build a Bubble Chart using the sample data
    var otuIds10 = otuIds.slice(0,10);
    var sampleValues10 = sampleValues.slice(0,10);
    var textValues10 = textValues.slice(0,10);

   
    var trace1 = {
      labels: otuIds10,
      values: sampleValues10,
      hoverinfo: textValues10,
      type: 'pie'
    };
    var data = [trace1];
    var layout = {
      title: "'Bar' Chart",
      height: 600,
      width: 800
    };
    var PIE = document.getElementById("pie");
    Plotly.newPlot(PIE, data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample.WFREQ)
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
