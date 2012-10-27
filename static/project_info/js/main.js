"use strict";
(function () {
    function rowMapCallback (week) {
        return [new Date(week.week), week.mine];
    }

    function getRows (raw) {
        return raw.map(rowMapCallback);
    }

    function drawCommitActivity (dataSource, chartDiv) {
        var chart = new google.visualization.ColumnChart(chartDiv),
            data = new google.visualization.DataTable();

        data.addColumn('date', "Week");
        data.addColumn('number', "Commits")
        data.addRows(getRows(dataSource));

        var chartOptions = {
            height:30,
            width:240,
            backgroundColor:'transparent',
            legend: {
                position: 'none'
            },
            hAxis: {
                textPosition: 'none',
                gridlineColor:'transparent',
                baselineColor:'transparent'
            },
            vAxis: {
                textPosition:'none',
                gridlineColor:'transparent',
                baselineColor:'transparent'
            },
            chartArea: {
                top:0,
                left:0,
                width:'100%',
                height:'100%'
            }
        };
        chart.draw(data, chartOptions)
    }

    function drawCharts () {
        $('.commit-activity').each(function () {
            console.log(this, arguments);
            var $this = $(this),
                dataSource = $this.data('source'),
                chartDiv = $('.chart', $this)[0];
            drawCommitActivity(window[dataSource], chartDiv);
        });
    }

    google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(drawCharts);
})();
