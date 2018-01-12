function circles_graph_by_region(filter) {
    document.getElementById("graph_circle_title").innerHTML = "Salaries by Region: " + filter;
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            salary_rating = 0;
            count = 0;
            _.each(d.children, function (element, index, list) {
                salary_rating += element.value;
                region_or_uni = element.parent.data.name;
                count += 1
            });
            salary_rating = (salary_rating / count).toFixed(2);
            if(d.depth==1)
                return "<strong><span>Region:</strong></span> <span style='color:lightskyblue'>" + region_or_uni + "</span><br/>" +
                "<span><strong>Average " + filter + ": </strong></span> <span style='color:greenyellow'>" + formatDollar(salary_rating) + "</span>";
            else if(d.depth == 2)
                return "<strong><span>University:</strong></span> <span style='color:lightskyblue'>" + region_or_uni + "</span><br/>" +
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
        .range(["hsl(152,80%,80%)", "hsl(240,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin])
        .padding(2);

    d3.csv("dataset/salaries-by-region.csv", function (error, data) {
        data = data.filter(function (row) {
            return row[filter] !== "N/A";
        });
        _.each(data, function (element, index, list) {
            element['Starting Median Salary'] = +element['Starting Median Salary'].replace("$", "").replace(",", "");
            element['Mid-Career Median Salary'] = +element['Mid-Career Median Salary'].replace("$", "").replace(",", "");
            element['Percent change from Starting to Mid-Career Salary'] = +element['Percent change from Starting to Mid-Career Salary'];
            element['Mid-Career 10th Percentile Salary'] = +element['Mid-Career 10th Percentile Salary'].replace("$", "").replace(",", "");
            element['Mid-Career 25th Percentile Salary'] = +element['Mid-Career 25th Percentile Salary'].replace("$", "").replace(",", "");
            element['Mid-Career 75th Percentile Salary'] = +element['Mid-Career 75th Percentile Salary'].replace("$", "").replace(",", "");
            element['Mid-Career 90th Percentile Salary'] = +element['Mid-Career 90th Percentile Salary'].replace("$", "").replace(",", "");


        });

        //*************************************************
        // THE FUNCTION
        //*************************************************
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

        //*************************************************
        // CALL THE FUNCTION
        //*************************************************
        var preppedData = genJSON(data, ['Region', 'School Name'])

        root = d3.hierarchy(preppedData)
            .sum(function (d) {
                return d[filter];
            })
            .sort(function (a, b) {
                return b.value - a.value;
            });


        var focus = root,
            nodes = pack(root).descendants(),
            view;
        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d) {
                return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            })
            .style("fill", function (d) {
                return d.children ? color(d.depth) : null;
            })
            .on("click", function (d) {
                if (focus !== d) zoom(d), d3.event.stopPropagation();
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) {
                return d.parent === root ? 1 : 0;
            })
            .style("font-size", function (d) {
                if (d.parent === root)
                    return "10px";
                else
                    return "7px";
            })
            .style("display", function (d) {
                return d.parent === root ? "inline" : "none";
            })
            .text(function (d) {
                if (d.data.name !== null)
                    return d.data.name;
            });

        var node = g.selectAll("circle,text");

        svg
            .style("background", "#F6F6F6")
            .on("click", function () {
                zoom(root);
            });
        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            var focus0 = focus;
            focus = d;
            if(d.depth<2)
            {
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
                        startCareerCollege();
                        break;
                    case "Mid-Career Median Salary":
                        $("#uni").val("2");
                        midCareerCollege();
                        break;
                    case "Mid-Career 10th Percentile Salary":
                        $("#uni").val("3");
                        midCareerTHCollege("Mid-Career 10th Percentile Salary");
                        break;
                    case "Mid-Career 25th Percentile Salary":
                        $("#uni").val("4");
                        midCareerTHCollege("Mid-Career 25th Percentile Salary");
                        break;
                    case "Mid-Career 75th Percentile Salary":
                        $("#uni").val("5");
                        midCareerTHCollege("Mid-Career 75th Percentile Salary");
                        break;
                    case "Mid-Career 90th Percentile Salary":
                        $("#uni").val("6");
                        midCareerTHCollege("Mid-Career 90th Percentile Salary");
                        break;
                    default:
                        break;
                }
            }

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

function circles_graph_by_type(filter) {
    document.getElementById("graph_circle_title").innerHTML = "Salaries by School Type: " + filter;
    d3.selectAll("svg").remove();

    tip
        .html(function (d) {
            salary_rating = 0;
            count = 0;
            _.each(d.children, function (element, index, list) {
                salary_rating += element.value;
                type_or_uni = element.parent.data.name;
                count += 1
            });
            salary_rating = (salary_rating / count).toFixed(2);
            if(d.depth==1)
                return "<strong><span>Type:</strong></span> <span style='color:lightskyblue'>" + type_or_uni + "</span><br/>" +
                "<span><strong>Average " + filter + ": </strong></span> <span style='color:greenyellow'>" + formatDollar(salary_rating) + "</span>";
            else if(d.depth == 2)
                return "<strong><span>University:</strong></span> <span style='color:lightskyblue'>" + type_or_uni + "</span><br/>" +
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
        .domain([-1, 5])
        .range(["hsl(152,80%,80%)", "hsl(240,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin])
        .padding(2);

    d3.csv("dataset/salaries-by-college-type.csv", function (error, data) {
        data = data.filter(function (row) {
            return row[filter] !== "N/A";
        });
        _.each(data, function (element, index, list) {
            element['Starting Median Salary'] = +element['Starting Median Salary'].replace("$", "").replace(",", "");
            element['Mid-Career Median Salary'] = +element['Mid-Career Median Salary'].replace("$", "").replace(",", "");
            element['Percent change from Starting to Mid-Career Salary'] = +element['Percent change from Starting to Mid-Career Salary'];
            element['Mid-Career 10th Percentile Salary'] = +element['Mid-Career 10th Percentile Salary'].replace("$", "").replace(",", "");
            element['Mid-Career 25th Percentile Salary'] = +element['Mid-Career 25th Percentile Salary'].replace("$", "").replace(",", "");
            element['Mid-Career 75th Percentile Salary'] = +element['Mid-Career 75th Percentile Salary'].replace("$", "").replace(",", "");
            element['Mid-Career 90th Percentile Salary'] = +element['Mid-Career 90th Percentile Salary'].replace("$", "").replace(",", "");


        });

        //*************************************************
        // THE FUNCTION
        //*************************************************
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

        //*************************************************
        // CALL THE FUNCTION
        //*************************************************
        var preppedData = genJSON(data, ['School Type','School Name'])

        root = d3.hierarchy(preppedData)
            .sum(function (d) {
                return d[filter];
            })
            .sort(function (a, b) {
                return b.value - a.value;
            });


        var focus = root,
            nodes = pack(root).descendants(),
            view;
        var circle = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d) {
                return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            })
            .style("fill", function (d) {
                return d.children ? color(d.depth) : null;
            })
            .on("click", function (d) {
                if (focus !== d) zoom(d), d3.event.stopPropagation();
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        var text = g.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) {
                return d.parent === root ? 1 : 0;
            })
            .style("font-size", function (d) {
                if (d.parent === root)
                    return "10px";
                else
                    return "7px";
            })
            .style("display", function (d) {
                return d.parent === root ? "inline" : "none";
            })
            .text(function (d) {
                if (d.data.name !== null)
                    return d.data.name;
            });

        var node = g.selectAll("circle,text");

        svg
            .style("background", "#F6F6F6")
            .on("click", function () {
                zoom(root);
            });
        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            var focus0 = focus;
            focus = d;
            if(d.depth<2)
            {
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
                        startCareerCollege();
                        break;
                    case "Mid-Career Median Salary":
                        $("#uni").val("2");
                        midCareerCollege();
                        break;
                    case "Mid-Career 10th Percentile Salary":
                        $("#uni").val("3");
                        midCareerTHCollege("Mid-Career 10th Percentile Salary");
                        break;
                    case "Mid-Career 25th Percentile Salary":
                        $("#uni").val("4");
                        midCareerTHCollege("Mid-Career 25th Percentile Salary");
                        break;
                    case "Mid-Career 75th Percentile Salary":
                        $("#uni").val("5");
                        midCareerTHCollege("Mid-Career 75th Percentile Salary");
                        break;
                    case "Mid-Career 90th Percentile Salary":
                        $("#uni").val("6");
                        midCareerTHCollege("Mid-Career 90th Percentile Salary");
                        break;
                    default:
                        break;
                }
            }

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