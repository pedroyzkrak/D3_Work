var bRegion = true;
var sCircles = "Starting Median Salary";

var bDegree = true;
var sBars = "Starting Median Salary";


$('#degree').change(function () {
    bDegree = true;
    $("html, body").scrollTop(0);

    switch ($(this).val()) {
        case "1":
            sBars = "Starting Median Salary";
            careerDegree(sBars);
            break;
        case "2":
            sBars = "Mid-Career Median Salary";
            careerDegree(sBars);
            break;
        case "3":
            sBars = "Mid-Career 10th Percentile Salary";
            careerDegree(sBars);
            break;
        case "4":
            sBars = "Mid-Career 25th Percentile Salary";
            careerDegree(sBars);
            break;
        case "5":
            sBars = "Mid-Career 75th Percentile Salary";
            careerDegree(sBars);
            break;
        case "6":
            sBars = "Mid-Career 90th Percentile Salary";
            careerDegree(sBars);
            break;
        default:
            break;
    }
});

$('#uni').change(function () {
    bDegree = false;
    switch ($(this).val()) {
        case "1":
            sBars = "Starting Median Salary";
            careerCollege(sBars);
            break;
        case "2":
            sBars = "Mid-Career Median Salary";
            careerCollege(sBars);
            break;
        case "3":
            sBars = "Mid-Career 10th Percentile Salary";
            careerCollege(sBars);
            break;
        case "4":
            sBars = "Mid-Career 25th Percentile Salary";
            careerCollege(sBars);
            break;
        case "5":
            sBars = "Mid-Career 75th Percentile Salary";
            careerCollege(sBars);
            break;
        case "6":
            sBars = "Mid-Career 90th Percentile Salary";
            careerCollege(sBars);
            break;
        default:
            break;
    }
});

$('#type').change(function () {
    bRegion = false;
    switch ($(this).val()) {
        case "1":
            sCircles = "Starting Median Salary";
            circles_graph_by_type(sCircles);
            break;
        case "2":
            sCircles = "Mid-Career Median Salary";
            circles_graph_by_type(sCircles);
            break;
        case "3":
            sCircles = "Mid-Career 10th Percentile Salary";
            circles_graph_by_type(sCircles);
            break;
        case "4":
            sCircles = "Mid-Career 25th Percentile Salary";
            circles_graph_by_type(sCircles);
            break;
        case "5":
            sCircles = "Mid-Career 75th Percentile Salary";
            circles_graph_by_type(sCircles);
            break;
        case "6":
            sCircles = "Mid-Career 90th Percentile Salary";
            circles_graph_by_type(sCircles);
            break;
        default:
            break;
    }
});

$('#region').change(function () {
    bRegion = true;
    switch ($(this).val()) {
        case "1":
            sCircles = "Starting Median Salary";
            circles_graph_by_region(sCircles);
            break;
        case "2":
            sCircles = "Mid-Career Median Salary";
            circles_graph_by_region(sCircles);
            break;
        case "3":
            sCircles = "Mid-Career 10th Percentile Salary";
            circles_graph_by_region(sCircles);
            break;
        case "4":
            sCircles = "Mid-Career 25th Percentile Salary";
            circles_graph_by_region(sCircles);
            break;
        case "5":
            sCircles = "Mid-Career 75th Percentile Salary";
            circles_graph_by_region(sCircles);
            break;
        case "6":
            sCircles = "Mid-Career 90th Percentile Salary";
            circles_graph_by_region(sCircles);
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
        $("html, body").scrollTop(0);
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
        $("html, body").scrollTop(0);
        if (bDegree)
            careerDegree(sBars);
        else
            careerCollege(sBars);
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
        $("html, body").scrollTop(0);
        if (bRegion)
            circles_graph_by_region(sCircles);
        else
            circles_graph_by_type(sCircles);
    });