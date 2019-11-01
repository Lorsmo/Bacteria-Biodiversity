//---------------- Gauge Chart ------------------------//
// Build a Gauge Chart using the sample data

function buildGauge(sample) {

    // Use `d3.json` to fetch the sample data for the gauge chart
    d3.json(`/metadata/${sample}`).then(function (data) {
    var WFREQ = data.WFREQ;
    console.log(WFREQ);
    var degrees = 180 - WFREQ * 20,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
    var data = [{
        type: 'scatter',
        x: [0], y: [0],
        marker: { size: 14, color: '850000' },
        showlegend: false,
        name: 'Washing Frequency',
        hoverinfo: 'text+name'
    },
    {
        values: [
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50
        ],
        rotation: 90,
        text: [
            "8-9",
            "7-8",
            "6-7",
            "5-6",
            "4-5",
            "3-4",
            "2-3",
            "1-2",
            "0-1",
            ""
        ],
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: [
                "rgba(0, 100, 0, 1)",
                "rgba(14, 127, 0, 1)",
                "rgba(100, 140, 15, 1)",
                "rgba(130, 175, 30, 1)",
                "rgba(170, 202, 42, 1)",
                "rgba(202, 209, 95, 1)",
                "rgba(210, 206, 145, 1)",
                "rgba(232, 226, 202, 1)",
                "rgba(240, 240, 240, 1)",
                "rgba(0, 0, 0, 0)"
            ]
        },
        labels: [
            "8-9",
            "7-8",
            "6-7",
            "5-6",
            "4-5",
            "3-4",
            "2-3",
            "1-2",
            "0-1",
            ""
        ],
        hoverinfo: "label",
        hole: .5,
        type: "pie",
        showlegend: false
    }];

    var layout = {
        label: {
            color: '#000'
        },
        title: {
            text: `Belly Button Washing Frequency<br>Scrubs per Week (Sample ${sample})`,
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#fff',
            },
        },
        margin: {
            l: 60,
            r: 30,
            b: 0,
            t: 50,
            pad: 0
          },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        height: 500,
        width: 450,
        xaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        },
        yaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        }
    };

    Plotly.newPlot("gauge", data, layout);

    });
};
