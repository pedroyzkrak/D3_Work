function circles_graph(filter, dataset) {

    var preppedData, colors;

    if (dataset === regionDataset) {
        document.getElementById("graph_circle_title").innerHTML = "Salaries by Region: " + filter;
        colors = ["hsl(152,80%,80%)", "hsl(240,20%,40%)"];
    }
    else if (dataset === collegeTypeDataset) {
        document.getElementById("graph_circle_title").innerHTML = "Salaries by School Type: " + filter;
        colors = ["hsl(152,70%,90%)", "hsl(240,30%,40%)"];
    }

    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            var salary_rating = 0,
                count = 0,
                current_node = "";
            _.each(d.children, function (element, index, list) {
                salary_rating += element.value;
                current_node = element.parent.data.name;
                count += 1
            });

            salary_rating = (salary_rating / count).toFixed(2);

            if (d.depth === 1 && dataset === regionDataset)
                return "<strong><span>Region:</strong></span> <span style='color:lightskyblue'>" + current_node + "</span><br/>" +
                    "<span><strong>Average " + filter + ": </strong></span> <span style='color:greenyellow'>" + formatDollar(salary_rating) + "</span>";
            else if (d.depth === 1 && dataset === collegeTypeDataset)
                return "<strong><span>College Type:</strong></span> <span style='color:lightskyblue'>" + current_node + "</span><br/>" +
                    "<span><strong>Average " + filter + ": </strong></span> <span style='color:greenyellow'>" + formatDollar(salary_rating) + "</span>";
            else if (d.depth === 2)
                return "<strong><span>University:</strong></span> <span style='color:lightskyblue'>" + current_node + "</span><br/>" +
                    "<span><strong> " + filter + ": </strong></span> <span style='color:greenyellow'>" + formatDollar(salary_rating) + "</span>";

        });

    var svg = d3.select("#svg_circle_container").append("svg")
            .attr("width", 750 + 20 + 20)
            .attr("height", 750 + 20 + 20),
        margin = 20,
        diameter = +svg.attr("width"),
        g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    svg.call(tip);

    var color = d3.scaleLinear()
        .domain([-3, 2])
        .range(colors)
        .interpolate(d3.interpolateHcl);

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin])
        .padding(2);

    d3.csv(dataset, function (error, data) {
        data = data.filter(function (row) {
            return row[filter] !== "N/A";
        });
        _.each(data, function (element, index, list) {
            element[filter] = +element[filter].replace("$", "").replace(",", "");

        });

        // CALL THE FUNCTION
        if (dataset === regionDataset) {
            preppedData = genJSON(data, ['Region', 'School Name']);
        }
        else if (dataset === collegeTypeDataset) {
            preppedData = genJSON(data, ['School Type', 'School Name']);
        }

        var root = d3.hierarchy(preppedData)
            .sum(function (d) {
                return d[filter];
            })
            .sort(function (a, b) {
                return b.value - a.value;
            });


        var focus = root,
            nodes = pack(root).descendants();

        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d) {
                return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            })
            .style("fill", function (d) {
                return d.children ? color(d.depth) : color(d.depth - 5);
            })
            .on("click", function (d) {
                if (focus !== d)
                    zoom(d);
                d3.event.stopPropagation();
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) {
                return d.parent === root ? 1 : 1;
            })
            .style('fill', 'black')
            .style("font-size", function (d) {
                if (d.parent === root)
                    return "20px";
                else
                    return "8px";
            })
            .style("display", function (d) {
                return d.parent === root ? "inline" : "none";
            })
            .text(function (d) {
                if (d.data.name !== null)
                    return d.data.name;
            });

        var node = g.selectAll("circle, text");

        svg
            .style("background", "#F6F6F6")
            .on("click", function () {
                zoom(root);
            });
        zoomTo([root.x, root.y, root.r * 2 + margin]);


        function zoom(d) {
            var focus = d;
            if (d.depth < 2) {
                var transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function (d) {
                        var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function (t) {
                            zoomTo(i(t));
                        };

                    });

                transition.selectAll("text")
                    .filter(function (d) {
                        return d.parent === focus || this.style.display === "inline";
                    })
                    .style("fill-opacity", function (d) {
                        return d.parent === focus ? 1 : 0;
                    })
                    .on("start", function (d) {
                        if (d.parent === focus) this.style.display = "inline";
                    })
                    .on("end", function (d) {
                        if (d.parent !== focus) this.style.display = "none";
                    });
            }
            else {
                $("#bar_chart").show();
                $("#circles").hide();
                $("#link_bar").hide();
                $("#link_circle").show();
                $("#uni").show();
                uni = d.data.name;
                switch (filter) {
                    case "Starting Median Salary":
                        $("#uni").val("1");
                        careerSalary(filter, regionDataset);
                        break;
                    case "Mid-Career Median Salary":
                        $("#uni").val("2");
                        careerSalary(filter, regionDataset);
                        break;
                    case "Mid-Career 10th Percentile Salary":
                        $("#uni").val("3");
                        careerSalary(filter, regionDataset);
                        break;
                    case "Mid-Career 25th Percentile Salary":
                        $("#uni").val("4");
                        careerSalary(filter, regionDataset);
                        break;
                    case "Mid-Career 75th Percentile Salary":
                        $("#uni").val("5");
                        careerSalary(filter, regionDataset);
                        break;
                    case "Mid-Career 90th Percentile Salary":
                        $("#uni").val("6");
                        careerSalary(filter, regionDataset);
                        break;
                    default:
                        break;
                }
            }

        }

        // Generates JSON from csv file
        function genJSON(csvData, groups) {

            var genGroups = function (data) {
                return _.map(data, function (element, index) {
                    return {name: index, children: element};
                });
            };

            var nest = function (node, curIndex) {
                if (curIndex === 0) {
                    node.children = genGroups(_.groupBy(csvData, groups[0]));
                    _.each(node.children, function (child) {
                        nest(child, curIndex + 1);
                    });
                }
                else {
                    if (curIndex < groups.length) {
                        node.children = genGroups(
                            _.groupBy(node.children, groups[curIndex])
                        );
                        _.each(node.children, function (child) {
                            nest(child, curIndex + 1);
                        });
                    }
                }
                return node;
            };
            return nest({}, 0);
        }

        function zoomTo(v) {
            var k = diameter / v[2];
            view = v;
            node.attr("transform", function (d) {
                return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
            });
            circle.attr("r", function (d) {
                return d.r * k;
            });
        }
    });
}
