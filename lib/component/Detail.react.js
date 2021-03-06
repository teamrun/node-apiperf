var React = require('react');

var LineChart = require('react-chartjs').Line;

var option = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : false,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    scaleShowHorizontalLines: true,

    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    showTooltips: true

    // //String - A legend template
    // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}


var Detail = React.createClass({

    render: function() {
        // 由于数据会很有大的差别 所以传递redraw, 而不是update
        return (
            <LineChart  data={this.props.data} options={option}
                redraw
                width="1200" height="350"
                ref={"chart"}
            >
            </LineChart>
        );
    }


});

module.exports = Detail;