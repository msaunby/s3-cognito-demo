// Import the Plotly JS library
import "https://cdn.plot.ly/plotly-2.18.0.min.js";

// My S3 bucket get URL func. This doesn't download data,
// it just provides a temporary signed URL.
import {s3url} from "/static/javascript/s3url.js";

// Sample Data is CSV so use the D3 fetch function.
import { csv } from "https://cdn.skypack.dev/d3-fetch@3";

// Convert CSV tabular data from
// x,y
// 0,2
// 1,4
// to 
// [{"x": [0,1], "y": [2,4]}]
// NB. Do not use spaces in CSV files
function csvtojson(csvdata) {
    var row;
    var data = {};
    Object.keys(csvdata[0]).forEach(k => {
        data[k] = [];
    });
    for (var i=0; i < csvdata.length; i++) {
        row = csvdata[i];
        Object.keys(row).forEach(k => {
            data[k].push( row[k] );
        });
    }
    return(data);
}

// Entry point into this script.
async function main() {
    s3url("data/sample.csv", async (data_src) => {
        const data = csvtojson(await csv(data_src));
        const el = document.getElementById("chart");
        Plotly.newPlot(el, [{ x: data.Year, y: data.Percent, type: "bar" }], { title: "Sample plot", yaxis: { title: "Percent" } });
    });
}

main();
