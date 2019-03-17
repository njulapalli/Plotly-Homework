function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json("/metadata/"+sample).then((sampleinfo) => {
console.log(sampleinfo);
    // Use d3 to select the panel with id of `#sample-metadata`
var panel = d3.select("#sample-metadata"); 

    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    var panelbody = Object.entries(sampleinfo);
    console.log(panelbody);
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
panelbody.forEach((info) => {  
  panel.append("h6")
  .text(info[0]+ ":" +info[1])
}); 
  // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
// Enter a speed between 0 and 180
//var level = 175;
var level = parseFloat(sampleinfo.WFREQ) * 20;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
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
    marker: {size: 12, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3', '1-2', '0-1', ""],
  textinfo: 'text',
  textposition:'inside',      
  marker: 
  {colors: [
    "rgba(0, 105, 11, .5)",
     "rgba(10, 120, 22, .5)",
      "rgba(14, 127, 0, .5)",
      "rgba(110, 154, 22, .5)",
      "rgba(170, 202, 42, .5)",
             "rgba(202, 209, 95, .5)",
             "rgba(210, 206, 145, .5)",
             "rgba(232, 226, 202, .5)",
             "rgba(240, 230, 215, .5)",
             "rgba(255, 255, 255, 0)"
  ]},
  labels: ['8-9', '7-8', '6-7', '5-6',
  '4-5', '3-4', '2-3', '1-2', '0-1', ""],
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
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week',
  height: 700,
  width: 700,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout, {showSendToCloud:true});

}
  );
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("/samples/"+sample).then((plotsample) => {
    console.log(plotsample);
var samplevalues = plotsample.sample_values; 
console.log(samplevalues); 
var labels = plotsample.otu_ids; 
console.log(labels); 
var hovertext = plotsample.otu_labels; 
console.log(hovertext); 

     // @TODO: Build a Pie Chart

     var data = [{
      values: samplevalues.slice(0,10),
      labels: labels.slice(0,10),
      hovertext: hovertext.slice(0,10), 
      type: 'pie'
    }];
    
    var layout = {
      height: 550,
      width: 500
    };
    
    Plotly.newPlot('pie', data, layout);
 
   

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: labels,
      y: samplevalues,
      mode: 'markers',
      marker: {
        size: samplevalues, 
        color: labels, 
        colorscale: "Earth" 
      }
    };
    
    var data = [trace1];
    
    var layout = {
      margin: {t: 0},
      title: 'Marker Size',
      hovermode: "closest",
      xaxis: {title: "OTU ID"}
    };
    
    
    // var bubbleLayout = {
    //   margin: { t: 0 },
    //   hovermode: 'closest',
    //   xaxis: { title: 'OTU ID' }
    
    
    Plotly.newPlot('bubble', data, layout); 

  });
  
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

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
