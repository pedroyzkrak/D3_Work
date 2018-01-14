var bRegion = true;
var sCircles = "Starting Median Salary";

var bDegree = true;
var sBars = "Starting Median Salary";

var degreeDataset = "dataset/degrees-that-pay-back.csv";
var regionDataset = "dataset/salaries-by-region.csv";
var collegeTypeDataset = "dataset/salaries-by-college-type.csv";


$('#degree').change(function () {
    bDegree = true;
    $("html, body").scrollTop(0);

    switch ($(this).val()) {
        case "1":
            sBars = "Starting Median Salary";
            careerSalary(sBars, degreeDataset);
            break;
        case "2":
            sBars = "Mid-Career Median Salary";
            careerSalary(sBars, degreeDataset);
            break;
        case "3":
            sBars = "Mid-Career 10th Percentile Salary";
            careerSalary(sBars, degreeDataset);
            break;
        case "4":
            sBars = "Mid-Career 25th Percentile Salary";
            careerSalary(sBars, degreeDataset);
            break;
        case "5":
            sBars = "Mid-Career 75th Percentile Salary";
            careerSalary(sBars, degreeDataset);
            break;
        case "6":
            sBars = "Mid-Career 90th Percentile Salary";
            careerSalary(sBars, degreeDataset);
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
            careerSalary(sBars, regionDataset);
            break;
        case "2":
            sBars = "Mid-Career Median Salary";
            careerSalary(sBars, regionDataset);
            break;
        case "3":
            sBars = "Mid-Career 10th Percentile Salary";
            careerSalary(sBars, regionDataset);
            break;
        case "4":
            sBars = "Mid-Career 25th Percentile Salary";
            careerSalary(sBars, regionDataset);
            break;
        case "5":
            sBars = "Mid-Career 75th Percentile Salary";
            careerSalary(sBars, regionDataset);
            break;
        case "6":
            sBars = "Mid-Career 90th Percentile Salary";
            careerSalary(sBars, regionDataset);
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
            circles_graph(sCircles, collegeTypeDataset);
            break;
        case "2":
            sCircles = "Mid-Career Median Salary";
            circles_graph(sCircles, collegeTypeDataset);
            break;
        case "3":
            sCircles = "Mid-Career 10th Percentile Salary";
            circles_graph(sCircles, collegeTypeDataset);
            break;
        case "4":
            sCircles = "Mid-Career 25th Percentile Salary";
            circles_graph(sCircles, collegeTypeDataset);
            break;
        case "5":
            sCircles = "Mid-Career 75th Percentile Salary";
            circles_graph(sCircles, collegeTypeDataset);
            break;
        case "6":
            sCircles = "Mid-Career 90th Percentile Salary";
            circles_graph(sCircles, collegeTypeDataset);
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
            circles_graph(sCircles, regionDataset);
            break;
        case "2":
            sCircles = "Mid-Career Median Salary";
            circles_graph(sCircles, regionDataset);
            break;
        case "3":
            sCircles = "Mid-Career 10th Percentile Salary";
            circles_graph(sCircles, regionDataset);
            break;
        case "4":
            sCircles = "Mid-Career 25th Percentile Salary";
            circles_graph(sCircles, regionDataset);
            break;
        case "5":
            sCircles = "Mid-Career 75th Percentile Salary";
            circles_graph(sCircles, regionDataset);
            break;
        case "6":
            sCircles = "Mid-Career 90th Percentile Salary";
            circles_graph(sCircles, regionDataset);
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
            careerSalary(sBars, degreeDataset);
        else
            careerSalary(sBars, regionDataset);
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
            circles_graph(sCircles, regionDataset);
        else
            circles_graph(sCircles, collegeTypeDataset);
    });

$(document).ready(function () {
    $("#to_the_top").on('click', function (event) {
        $('html, body').animate({scrollTop: "0px"}, 1000);
    });
});
