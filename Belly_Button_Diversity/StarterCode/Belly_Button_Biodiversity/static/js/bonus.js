function buildGauge(sample) {
    d3.json(`/metadata/${sample}`).then(function (data) {

    var WFREQ = data.WFREQ;
    console.log(WFREQ);
    var degrees = 180 - WFREQ * 20,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    // Path: may have to change to create a better triangle
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
                "rgba(0, 100, 0, .5)",
                "rgba(14, 127, 0, .5)",
                "rgba(100, 140, 15, .5)",
                "rgba(130, 175, 30, .5)",
                "rgba(170, 202, 42, .5)",
                "rgba(202, 209, 95, .5)",
                "rgba(210, 206, 145, .5)",
                "rgba(232, 226, 202, .5)",
                "rgba(240, 240, 240, 0.9)",
                "rgba(255, 255, 255, 0.9)"
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
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        height: 400,
        width: 400,
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
