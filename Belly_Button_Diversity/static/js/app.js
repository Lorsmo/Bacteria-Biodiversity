
//----------------------------------------------------------------------------
//---------------- Metadata Panel --------------------------------------------
function buildMetadata(sample) {

  // Use d3 to select the panel with id of `#sample-metadata`
  var table = d3.select("#sample-metadata").html("").append("table");
  var thead = table.append("thead");
  var trow = thead.append("tr")
  trow.append("th").text("Parameter");
  trow.append("th").text("Value");
  var tbody = table.append("tbody");

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(data) {
  console.log(data);
  
    // Use `Object.entries` to add each key and value pair to the table
    Object.entries(data).forEach(([key, value]) => {
    console.log(`key: ${key}, value: ${value}`);
    var row = tbody.append("tr");
    row.append("td").text(key);
    row.append("td").text(value);
    table.attr("class", "table table-bordered text-center thead-light table-dark table-hover table-sm table-striped");
    
    });
  });
};   

//----------------------------------------------------------------------------
//---------------- Build Charts ----------------------------------------------
function buildCharts(sample) {

  // Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(data) {
    console.log(data);
    var otuIds = data.otu_ids,
    sampleValues = data.sample_values,
    textValues = data.otu_labels;
    
    //---------------- Bubble Chart ------------------------//
    // Build a Bubble Chart using the sample data
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
      title: {
        text: `Abundance of Species (Sample ${sample})`,
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#fff',
        },
      }, 
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      xaxis: {
        title: {
          text: `Operational Taxonomic Unit ID`,
          font: {
            family: 'Courier New, monospace',
            size: 16,
            color: '#fff',
          },
        },
        showgrid: true,
        zeroline: true,
        showline: true,
        mirror: 'ticks',
        tickcolor: '#fff',
        tickfont: {
          size: 14,
          color: 'rgba(255,255,255,1)'
        },
        gridcolor: '#343a40',
        gridwidth: 1,
        linecolor: '#636363',
        linewidth: 6
      },
      yaxis: {
        title: {
          text: `Abundance`,
          font: {
            family: 'Courier New, monospace',
            size: 16,
            color: '#fff',
          },
        },  
        mirror: 'ticks',
        tickcolor: '#fff',
        tickfont: {
          size: 14,
          color: 'rgba(255,255,255,1)'
        },
        zerolinecolor: '#fff',
        zerolinewidth: 2,
        gridcolor: '#343a40',
        gridwidth: 1,
        linecolor: '#636363',
        linewidth: 6
      },
      showlegend: false,
      height: 600,
      width: 1100
    };
    
    Plotly.newPlot("bubble", data, layout);

    //---------------- Pie Chart ------------------------//
    // Build a Pie Chart with the top 10 sample_values, otu_ids, and labels.
    var otuIds10 = otuIds.slice(0,10),
    sampleValues10 = sampleValues.slice(0,10),
    textValues10 = textValues.slice(0,10);

    var trace1 = {
      labels: otuIds10,
      values: sampleValues10,
      hoverinfo: textValues10,
      type: 'pie'
    };
    var data = [trace1];
    var layout = {
      title: {
        text: `Belly Button Bacteria Repartition<br>(Sample ${sample})`,
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#fff',
        },
      },
      margin: {
        l: 90,
        r: 30,
        b: 50,
        t: 50,
        pad: 0
      },
      paper_bgcolor:'rgba(255,255,255,0)',
      plot_bgcolor:'rgba(255,255,255,0)',
      autosize: false,
      height: 550,
      width: 500,
      legend: {
      orientation: "h",
      font: {
        family: 'sans-serif',
        size: 12,
        color: '#fff'
      }},
    };
    var PIE = document.getElementById("pie");
    Plotly.newPlot(PIE, data, layout);
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
    buildGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildGauge(newSample);
}

// Initialize the dashboard
init();
