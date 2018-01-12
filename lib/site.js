$('#degree').change(function () {

    switch ($(this).val()) {
        case "1":
            startCareerDegree();
            break;
        case "2":
            midCareerDegree();
            break;
        case "3":
            midCareerTHDegree("Mid-Career 10th Percentile Salary");
            break;
        case "4":
            midCareerTHDegree("Mid-Career 25th Percentile Salary");
            break;
        case "5":
            midCareerTHDegree("Mid-Career 75th Percentile Salary");
            break;
        case "6":
            midCareerTHDegree("Mid-Career 90th Percentile Salary");
            break;
        default:
            break;
    }
});

$('#uni').change(function () {

    switch ($(this).val()) {
        case "1":
            startCareerCollege();
            break;
        case "2":
            midCareerCollege();
            break;
        case "3":
            midCareerTHCollege("Mid-Career 10th Percentile Salary");
            break;
        case "4":
            midCareerTHCollege("Mid-Career 25th Percentile Salary");
            break;
        case "5":
            midCareerTHCollege("Mid-Career 75th Percentile Salary");
            break;
        case "6":
            midCareerTHCollege("Mid-Career 90th Percentile Salary");
            break;
        default:
            break;
    }
});

$('#type').change(function () {

    switch ($(this).val()) {
        case "1":
            circles_graph_by_type("Starting Median Salary");
            break;
        case "2":
            circles_graph_by_type("Mid-Career Median Salary");
            break;
        case "3":
            circles_graph_by_type("Mid-Career 10th Percentile Salary");
            break;
        case "4":
            circles_graph_by_type("Mid-Career 25th Percentile Salary");
            break;
        case "5":
            circles_graph_by_type("Mid-Career 75th Percentile Salary");
            break;
        case "6":
            circles_graph_by_type("Mid-Career 90th Percentile Salary");
            break;
        default:
            break;
    }
});

$('#region').change(function () {

    switch ($(this).val()) {
        case "1":
            circles_graph_by_region("Starting Median Salary");
            break;
        case "2":
            circles_graph_by_region("Mid-Career Median Salary");
            break;
        case "3":
            circles_graph_by_region("Mid-Career 10th Percentile Salary");
            break;
        case "4":
            circles_graph_by_region("Mid-Career 25th Percentile Salary");
            break;
        case "5":
            circles_graph_by_region("Mid-Career 75th Percentile Salary");
            break;
        case "6":
            circles_graph_by_region("Mid-Career 90th Percentile Salary");
            break;
        default:
            break;
    }
});

d3.select('#degree_btn')
    .on("click", function () {
        $("#degree").show();
        $("#uni").hide().val("0");
    });

d3.select('#uni_btn')
    .on("click", function () {
        $("#degree").hide().val("0");
        $("#uni").show();
    });

d3.select('#region_btn')
    .on("click", function () {
        $("#type").hide().val("0");
        $("#region").show();
    });

d3.select('#type_btn')
    .on("click", function () {
        $("#region").hide().val("0");
        $("#type").show();
    });

d3.select('#home')
    .on("click", function () {
        $("#about").show();
        $("#bar_chart").hide();
        $("#circles").hide();
        $("#home").hide();
        $("#link_bar").show();
        $("#link_circle").show();
    });

d3.select('#link_bar')
    .on("click", function () {
        uni = "";
        $("#about").hide();
        $("#bar_chart").show();
        $("#circles").hide();
        $("#home").show();
        $("#link_bar").hide();
        $("#link_circle").show();
        $("#degree").hide().val("0");
        $("#uni").hide().val("0");
        $("#type").hide().val("0");
        $("#region").hide().val("0");
        midCareerDegree();
    });

d3.select('#link_circle')
    .on("click", function () {
        $("#about").hide();
        $("#bar_chart").hide();
        $("#circles").show();
        $("#home").show();
        $("#link_bar").show();
        $("#link_circle").hide();
        $("#degree").hide().val("0");
        $("#uni").hide().val("0");
        $("#type").hide().val("0");
        $("#region").hide().val("0");
        circles_graph_by_region("Starting Median Salary");
    });