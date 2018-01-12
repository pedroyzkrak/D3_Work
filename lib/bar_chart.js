var margin = {top: 30, right: 10, bottom: 10, left: 250},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom,
    bigHeight = 3900 - margin.top - margin.bottom;

var formatDollar = d3.format("$,.0f");

var uni = "";

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleBand().rangeRound([0, height], .1),
    yBig = d3.scaleBand().rangeRound([0, bigHeight], 0.1);

var xAxis = d3.axisTop().scale(x).tickSize(-height).tickFormat(formatDollar),
    xAxisBig = d3.axisTop().scale(x).tickSize(-bigHeight).tickFormat(formatDollar),
    yAxis = d3.axisLeft().scale(y).tickSize(0),
    yAxisBig = d3.axisLeft().scale(yBig).tickSize(0);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0]);

function startCareerDegree() {

    document.getElementById("graph_title").innerHTML = "Starting Median Salary by College Degree";
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            return "<strong>Degree:</strong> <span style='color:lightskyblue'>" + d["Undergraduate Major"] + "</span><br/>" +
                "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>";
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("dataset/degrees-that-pay-back.csv", function (error, data) {

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b["Starting Median Salary"] - a["Starting Median Salary"];
        });

        x.domain([0, d3.max(data, function (d) {
            return d["Starting Median Salary"];
        })]);
        y.domain(data.map(function (d) {
            return d["Undergraduate Major"];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + y(d["Undergraduate Major"]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d["Starting Median Salary"]);
            })
            .attr("height", y.bandwidth() - 1)
            .attr("fill", "steelblue");

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d["Starting Median Salary"]);
            })
            .attr("y", y.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d["Starting Median Salary"]);
            })
            .style("font-size", "14px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
}

function midCareerDegree() {

    document.getElementById("graph_title").innerHTML = "Mid-Career Median Salary by College Degree";
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            return "<strong>Degree:</strong> <span style='color:lightskyblue'>" + d["Undergraduate Major"] + "</span><br/>" +
                "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>" +
                "<strong>Mid-Career Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Mid-Career Median Salary"]) + "</span>";
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("dataset/degrees-that-pay-back.csv", function (error, data) {

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
            d["Mid-Career Median Salary"] = +d["Mid-Career Median Salary"].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b["Mid-Career Median Salary"] - a["Mid-Career Median Salary"];
        });

        x.domain([0, d3.max(data, function (d) {
            return d["Mid-Career Median Salary"];
        })]);
        y.domain(data.map(function (d) {
            return d["Undergraduate Major"];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + y(d["Undergraduate Major"]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d["Mid-Career Median Salary"]);
            })
            .attr("height", y.bandwidth() - 1)
            .attr("fill", "steelblue");

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d["Mid-Career Median Salary"]);
            })
            .attr("y", y.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d["Mid-Career Median Salary"]);
            })
            .style("font-size", "14px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
}

function midCareerTHDegree(percentile) {
    document.getElementById("graph_title").innerHTML = percentile + " by College Degree";
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            return "<strong>Degree:</strong> <span style='color:lightskyblue'>" + d["Undergraduate Major"] + "</span><br/>" +
                "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>" +
                "<strong>Mid-Career Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Mid-Career Median Salary"]) + "</span><br/>" +
                "<strong>" + percentile + ":</strong> <span style='color:greenyellow'>" + formatDollar(d[percentile]) + "</span>";
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("dataset/degrees-that-pay-back.csv", function (error, data) {

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
            d["Mid-Career Median Salary"] = +d["Mid-Career Median Salary"].replace("$", "").replace(",", "");
            d[percentile] = +d[percentile].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b[percentile] - a[percentile];
        });

        x.domain([0, d3.max(data, function (d) {
            return d[percentile];
        })]);
        y.domain(data.map(function (d) {
            return d["Undergraduate Major"];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + y(d["Undergraduate Major"]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d[percentile]);
            })
            .attr("height", y.bandwidth() - 1)
            .attr("fill", "steelblue");

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d[percentile]);
            })
            .attr("y", y.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d[percentile]);
            })
            .style("font-size", "14px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
}

function startCareerCollege() {
    document.getElementById("graph_title").innerHTML = "Starting Median Salary by College";
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            return "<strong>University:</strong> <span style='color:lightskyblue'>" + d["School Name"] + "</span><br/>" +
                "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>";
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", bigHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("dataset/salaries-by-region.csv", function (error, data) {

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b["Starting Median Salary"] - a["Starting Median Salary"];
        });

        x.domain([0, d3.max(data, function (d) {
            return d["Starting Median Salary"];
        })]);
        yBig.domain(data.map(function (d) {
            return d["School Name"];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + yBig(d["School Name"]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d["Starting Median Salary"]);
            })
            .attr("height", yBig.bandwidth() - 1)
            .attr("fill", function (d) {
                if (d["School Name"] === uni)
                    return "red";
                else
                    return "steelblue";
            });

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d["Starting Median Salary"]);
            })
            .attr("y", yBig.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d["Starting Median Salary"]);
            })
            .style("font-size", "14px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxisBig);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxisBig);

    });
}

function midCareerCollege() {
    document.getElementById("graph_title").innerHTML = "Mid-Career Median Salary by College";
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            return "<strong>Degree:</strong> <span style='color:lightskyblue'>" + d["School Name"] + "</span><br/>" +
                "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>" +
                "<strong>Mid-Career Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Mid-Career Median Salary"]) + "</span>";
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", bigHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("dataset/salaries-by-region.csv", function (error, data) {

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
            d["Mid-Career Median Salary"] = +d["Mid-Career Median Salary"].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b["Mid-Career Median Salary"] - a["Mid-Career Median Salary"];
        });

        x.domain([0, d3.max(data, function (d) {
            return d["Mid-Career Median Salary"];
        })]);
        yBig.domain(data.map(function (d) {
            return d["School Name"];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + yBig(d["School Name"]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d["Mid-Career Median Salary"]);
            })
            .attr("height", yBig.bandwidth() - 1)
            .attr("fill", function (d) {
                if (d["School Name"] === uni)
                    return "red";
                else
                    return "steelblue";
            });

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d["Mid-Career Median Salary"]);
            })
            .attr("y", yBig.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d["Mid-Career Median Salary"]);
            })
            .style("font-size", "14px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxisBig);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxisBig);

    });
}

function midCareerTHCollege(percentile) {
    document.getElementById("graph_title").innerHTML = percentile + " by College";
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            return "<strong>Degree:</strong> <span style='color:lightskyblue'>" + d["School Name"] + "</span><br/>" +
                "<strong>Starting Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Starting Median Salary"]) + "</span><br/>" +
                "<strong>Mid-Career Median Salary:</strong> <span style='color:greenyellow'>" + formatDollar(d["Mid-Career Median Salary"]) + "</span><br/>" +
                "<strong>" + percentile + ":</strong> <span style='color:greenyellow'>" + formatDollar(d[percentile]) + "</span>";
        });

    var svg = d3.select("#svg_container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", bigHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("dataset/salaries-by-region.csv", function (error, data) {

        data = data.filter(function (row) {
            return row[percentile] !== "N/A";
        });

        svg.call(tip);

        if (error) throw error;

        data.forEach(function (d) {
            d["Starting Median Salary"] = +d["Starting Median Salary"].replace("$", "").replace(",", "");
            d["Mid-Career Median Salary"] = +d["Mid-Career Median Salary"].replace("$", "").replace(",", "");
            d[percentile] = +d[percentile].replace("$", "").replace(",", "");
        });

        data.sort(function (a, b) {
            return b[percentile] - a[percentile];
        });

        x.domain([0, d3.max(data, function (d) {
            return d[percentile];
        })]);
        yBig.domain(data.map(function (d) {
            return d["School Name"];
        }));


        var bar = svg.selectAll("g.bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(0," + yBig(d["School Name"]) + ")";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bar.append("rect")
            .attr("width", function (d) {
                return x(d[percentile]);
            })
            .attr("height", yBig.bandwidth() - 1)
            .attr("fill", function (d) {
                if (d["School Name"] === uni)
                    return "red";
                else
                    return "steelblue";
            });

        bar.append("text")
            .attr("class", "value")
            .attr("x", function (d) {
                return x(d[percentile]);
            })
            .attr("y", yBig.bandwidth() / 2)
            .attr("dx", -5)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .text(function (d) {
                return formatDollar(d[percentile]);
            })
            .style("font-size", "14px")
            .style("font-family", "Montserrat");

        svg.append("g")
            .attr("class", "x axis")
            .call(xAxisBig);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxisBig);

    });
}