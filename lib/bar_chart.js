var margin = {top: 30, right: 10, bottom: 10, left: 450},
    height,
    width = 1200 - margin.right - margin.left;

var formatDollar = d3.format("$,.0f");

var uni = "";

var x = d3.scaleLinear().range([0, width]),
    y;

var xAxis, yAxis;

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0]);

function careerSalary(filter, dataset) {
    var type, tip_type,
        offset_counter = 0,
        offset = 0;

    if (dataset === degreeDataset) {
        document.getElementById("graph_title").innerHTML = filter + " by College Degree";
        height = 800 - margin.top - margin.bottom;
        type = "Undergraduate Major";
        tip_type = "Degree";

    }
    else if (dataset === regionDataset) {
        document.getElementById("graph_title").innerHTML = filter + " by College";
        height = 3900 - margin.top - margin.bottom;
        type = "School Name";
        tip_type = "University";
    }

    y = d3.scaleBand().rangeRound([0, height], .1);

    xAxis = d3.axisTop().scale(x).tickSize(-height).tickFormat(formatDollar);
    yAxis = d3.axisLeft().scale(y).tickSize(0);

    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            switch (filter) {
                case "Starting Median Salary":
                    return "<strong>" + tip_type + ":</strong> <span style='color:lightskyblue'>" + d[type] + "</span><br/>" +
                        "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>";
                    break;
                case "Mid-Career Median Salary":
                    return "<strong>" + tip_type + ":</strong> <span style='color:lightskyblue'>" + d[type] + "</span><br/>" +
                        "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>" +
                        "<strong>Mid-Career Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Mid-Career Median Salary"]) + "</span>";
                    break;
                default:
                    return "<strong>" + tip_type + ":</strong> <span style='color:lightskyblue'>" + d[type] + "</span><br/>" +
                        "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>" +
                        "<strong>Mid-Career Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Mid-Career Median Salary"]) + "</span><br/>" +
                        "<strong>" + filter + ":</strong> <span style='color:greenyellow'>" + formatDollar(d[filter]) + "</span>";
                    break;
            }
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(dataset, function (error, data) {

        data = data.filter(function (row) {
            return row[filter] !== "N/A";
        });

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
            d["Mid-Career Median Salary"] = +d["Mid-Career Median Salary"].replace("$", "").replace(",", "");
            if (filter !== "Starting Median Salary" && filter !== "Mid-Career Median Salary")
                d[filter] = +d[filter].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b[filter] - a[filter];
        });

        x.domain([0, d3.max(data, function (d) {
            return d[filter];
        })]);
        y.domain(data.map(function (d) {
            return d[type];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + y(d[type]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d[filter]);
            })
            .attr("height", y.bandwidth() - 1)
            .attr("fill", function (d) {
                offset_counter += y.bandwidth();
                if (d[type] === uni) {
                    offset = offset_counter;
                    return "orangered";
                }
                else {
                    return "steelblue";
                }
            });

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d[filter]);
            })
            .attr("y", y.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d[filter]);
            })
            .style("font-size", "13px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        if (offset === 0 && dataset === regionDataset && uni !== "") {
            $("html, body").animate({scrollTop: "0px"});
            alert("Sorry! No information found for " + uni + " on " + filter + " filter!");
        } else {
            $("html, body").animate({scrollTop: (offset - window.screen.availHeight / 2) + "px"}, 500);
        }

    });
}
