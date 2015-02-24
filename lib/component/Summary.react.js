var React = require('react');

var BarChart = require('react-chartjs').Bar;

var option = {
    animation: false,
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


var Summary = React.createClass({
    componentDidMount: function() {
        // 如果有处理函数, 就绑定
        if(this.props.handleBarClick instanceof Function){
            this.chartCanvas = this.refs.chart.getCanvass();
            this.chartIns = this.refs.chart.getChart();
            this.chartCanvas.addEventListener('click', function(e){
                this.props.handleBarClick( this.chartIns.getBarsAtEvent(e) )
            }.bind(this));
        }
        
    },

    render: function() {
        return (
            <BarChart data={this.props.data} options={option}
                width="600" height="350"
                ref={"chart"}
            >
            </BarChart>
        );
    }

});

module.exports = Summary;