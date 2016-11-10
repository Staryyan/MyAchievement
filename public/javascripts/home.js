/**
 * Created by yanzexin on 16/11/10.
 */
// Use Morris.Area instead of Morris.Line

$(document).ready(function() {
    var home = function() {
        this.ticks = [];
        for (var i = 1; i <= 14; i++) {
            this.ticks[i - 1] = [i, '作业 ' + i];
        }
        this.user = $('#name').val();
        this.load_score();
        this.load_rank();
    };

    home.prototype.load_score = function() {
        var d2 = [
            ['1', 98],
            ['2', 95],
            ['3', 43],
            ['4', 40]
        ];
        var data = ([{
            label: "分数",
            data: d2,
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: ["rgba(255,255,255,.4)", "rgba(183,236,240,.4)"]
                }
            },
            points: {
                show: true
            }
        }
        ]);
        var options = {
            xaxis: {
                ticks: this.ticks
            },
            grid: {
                backgroundColor:
                {
                    colors: ["#ffffff", "#f4f4f6"]
                },
                hoverable: true,
                clickable: true,
                tickColor: "#eeeeee",
                borderWidth: 1,
                borderColor: "#eeeeee"
            },
            // Tooltip
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y",
                shifts: {
                    x: -60,
                    y: 25
                },
                defaultTheme: false
            },
            legend: {
                labelBoxBorderColor: "#000000",
                container: $("#main-chart-legend"), //remove to show in the chart
                noColumns: 0
            },
            series: {
                stack: true,
                shadowSize: 0,
                highlightColor: 'rgba(000,000,000,.2)'
            },
            points: {
                show: true,
                radius: 3,
                symbol: "circle"
            },
            colors: ["#5abcdf", "#ff8673"]
        };
        var plot = $.plot($("#main-chart-1 #main-chart-score"), data, options);
    };

    home.prototype.load_rank = function() {
        var d2 = [
            [1, 98],
            [2, 95],
            [3, 43],
            [4, 1]
        ];
        var data = ([{
            label: "排名",
            data: d2,
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: ["rgba(255,255,255,.4)", "rgba(183,236,240,.4)"]
                }
            }
        }
        ]);
        var yticks = [
            [1, 100],
            [10, 90],
            [20, 80],
            [30, 70],
            [40, 60],
            [50, 50],
            [60, 40],
            [70, 30],
            [80, 20],
            [90, 10],
            [100, 1]
        ];
        var options = {
            xaxis: {
                ticks: this.ticks
            },
            yaxis: {
                ticks: yticks
            },
            grid: {
                backgroundColor:
                {
                    colors: ["#ffffff", "#f4f4f6"]
                },
                hoverable: true,
                clickable: true,
                tickColor: "#eeeeee",
                borderWidth: 1,
                borderColor: "#eeeeee"
            },
            // Tooltip
            tooltip: true,
            tooltipOpts: {
                content: "%s : %y",
                shifts: {
                    x: -60,
                    y: 25
                },
                defaultTheme: false
            },
            legend: {
                labelBoxBorderColor: "#000000",
                container: $("#main-chart-legend"), //remove to show in the chart
                noColumns: 0
            },
            series: {
                stack: true,
                shadowSize: 0,
                highlightColor: 'rgba(000,000,000,.2)'
            },
            points: {
                show: true,
                radius: 3,
                symbol: "circle"
            },
            colors: ["#5abcdf", "#ff8673"]
        };
        var plot = $.plot($("#main-chart-2 #main-chart-rank"), data, options);
    };

    $(new home());
});


