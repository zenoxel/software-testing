/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.3262347754614, "KoPercent": 1.6737652245385937};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.966562056340133, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9990494296577946, 500, 1500, "HTTP Request - Contact Page-0"], "isController": false}, {"data": [0.9904942965779467, 500, 1500, "HTTP Request - Contact Page-1"], "isController": false}, {"data": [0.09666666666666666, 500, 1500, "HTTP Request - Random Article"], "isController": false}, {"data": [0.9818138875767596, 500, 1500, "HTTP Request - About Wikipedia-1"], "isController": false}, {"data": [0.997401983939537, 500, 1500, "HTTP Request - About Wikipedia-0"], "isController": false}, {"data": [0.935, 500, 1500, "HTTP Request - Homepage"], "isController": false}, {"data": [0.9838403041825095, 500, 1500, "HTTP Request - Contact Page"], "isController": false}, {"data": [0.9966666666666667, 500, 1500, "HTTP Request - Random Article-0"], "isController": false}, {"data": [0.9671705243268777, 500, 1500, "HTTP Request - About Wikipedia"], "isController": false}, {"data": [0.43333333333333335, 500, 1500, "HTTP Request - Random Article-1"], "isController": false}, {"data": [0.37142857142857144, 500, 1500, "HTTP Request - Random Article-2"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 13383, 224, 1.6737652245385937, 183.12777404169512, 43, 5479, 158.0, 297.0, 408.0, 845.0, 222.29789213162135, 18098.059637808747, 58.88248664933641], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["HTTP Request - Contact Page-0", 2104, 0, 0.0, 73.89258555133071, 43, 1395, 63.0, 96.0, 118.0, 297.449999999998, 35.67310952865378, 64.63439672346558, 7.211263351983724], "isController": false}, {"data": ["HTTP Request - Contact Page-1", 2104, 1, 0.04752851711026616, 156.66730038022823, 59, 2131, 140.0, 205.0, 266.75, 617.9499999999998, 35.77987891980138, 3222.504494539062, 7.197905329569417], "isController": false}, {"data": ["HTTP Request - Random Article", 150, 108, 72.0, 613.6466666666666, 92, 3454, 386.5, 1502.9, 1743.4499999999998, 3321.4000000000024, 4.709724010173004, 164.98402373308423, 2.290072637680932], "isController": false}, {"data": ["HTTP Request - About Wikipedia-1", 2117, 3, 0.14170996693434104, 212.82805857345318, 47, 2634, 192.0, 291.0, 394.59999999999945, 747.0, 35.47133138969873, 5416.625056157007, 6.962634384110787], "isController": false}, {"data": ["HTTP Request - About Wikipedia-0", 2117, 0, 0.0, 80.63863958431763, 43, 5260, 64.0, 99.0, 136.0999999999999, 408.4800000000023, 35.27216381479198, 63.56449038533631, 6.957985440027325], "isController": false}, {"data": ["HTTP Request - Homepage", 200, 0, 0.0, 268.97500000000014, 77, 1176, 167.5, 534.7, 623.8, 1113.800000000001, 6.412928463782987, 1226.5226697021194, 1.1397978324301792], "isController": false}, {"data": ["HTTP Request - Contact Page", 2104, 1, 0.04752851711026616, 230.6135931558938, 106, 2229, 209.0, 295.0, 391.5, 750.6499999999987, 35.60971481763561, 3271.6982485508165, 14.362121308284674], "isController": false}, {"data": ["HTTP Request - Random Article-0", 150, 0, 0.0, 78.6066666666667, 44, 513, 64.0, 103.70000000000002, 164.29999999999984, 502.2900000000002, 4.876304411430057, 8.770998585871721, 0.9571652213842203], "isController": false}, {"data": ["HTTP Request - About Wikipedia", 2117, 3, 0.14170996693434104, 293.5115729806329, 114, 5479, 263.0, 390.0, 535.4999999999995, 1007.6000000000049, 35.16436058003754, 5433.119508164044, 13.839098939213992], "isController": false}, {"data": ["HTTP Request - Random Article-1", 150, 80, 53.333333333333336, 280.6066666666667, 44, 2434, 240.0, 498.1, 781.499999999999, 1932.160000000009, 4.864286409183773, 11.071951916528846, 0.9500559392937056], "isController": false}, {"data": ["HTTP Request - Random Article-2", 70, 28, 40.0, 544.757142857143, 48, 2970, 434.0, 1254.3999999999999, 1838.0500000000004, 2970.0, 2.248057036418524, 149.1215140061982, 0.45591525025692076], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["429/5dcd7d4f469b", 178, 79.46428571428571, 1.330045580213704], "isController": false}, {"data": ["429/Too many requests (f061ab2)", 46, 20.535714285714285, 0.3437196443248898], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 13383, 224, "429/5dcd7d4f469b", 178, "429/Too many requests (f061ab2)", 46, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["HTTP Request - Contact Page-1", 2104, 1, "429/5dcd7d4f469b", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request - Random Article", 150, 108, "429/5dcd7d4f469b", 85, "429/Too many requests (f061ab2)", 23, "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request - About Wikipedia-1", 2117, 3, "429/5dcd7d4f469b", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request - Contact Page", 2104, 1, "429/5dcd7d4f469b", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["HTTP Request - About Wikipedia", 2117, 3, "429/5dcd7d4f469b", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request - Random Article-1", 150, 80, "429/5dcd7d4f469b", 71, "429/Too many requests (f061ab2)", 9, "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request - Random Article-2", 70, 28, "429/5dcd7d4f469b", 14, "429/Too many requests (f061ab2)", 14, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
