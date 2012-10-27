"use strict";
(function () {
    function rowMapCallback (week) {
        return [new Date(week.week), week.mine];
    }

    function getRows (raw) {
        return raw.map(rowMapCallback);
    }

    function drawCommitActivity () {
        var chart = new google.visualization.ColumnChart(document.getElementById('commit-activity')),
            data = new google.visualization.DataTable(),
            raw = window['activity'];

        data.addColumn('date', "Week");
        data.addColumn('number', "Commits")
        data.addRows(getRows(raw));

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

    google.load('visualization', '1.0', {'packages':['corechart']});
    google.setOnLoadCallback(drawCommitActivity);
})();

