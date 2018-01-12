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

document.getElementById('sms').onclick = function () {
    circles_graph("Starting Median Salary");
};

document.getElementById('mms').onclick = function () {
    circles_graph("Mid-Career Median Salary");
};

document.getElementById('mps10').onclick = function () {
    circles_graph("Mid-Career 10th Percentile Salary");
};

document.getElementById('mps25').onclick = function () {
    circles_graph("Mid-Career 25th Percentile Salary");
};

document.getElementById('mps75').onclick = function () {
    circles_graph("Mid-Career 75th Percentile Salary");
};

document.getElementById('mps90').onclick = function () {
    circles_graph("Mid-Career 90th Percentile Salary");
};

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
        circles_graph("Starting Median Salary");
    });