
var React = require('react');
var tool = require('../util');

var Summary = require('./Summary.react');

require('./chart.less');


var sp = summaryProcess = {
    // 先分组
    groupByPath: function(d){
        var dg = {};
        d.forEach(function(item, i){
            // 404的单独分组
            if(item.httpCode == 404){
                dg['/404'] = dg[404] || [];
                dg['/404'].push(item);
            }
            // 500
            if(item.httpCode == 500){
                dg['/500'] = dg[500] || [];
                dg['/500'].push(item);
            }
            // 其他返回正常的页面和接口
            else{
                dg[item.path] = dg[item.path] || [];
                dg[item.path].push(item);
            }
        });
        return dg;
    },
    // 获取三个重要的数学指标 avg, min, max
    getMainData: function(dg){
        var mainDataGroup = {};
        for(var i in dg){
            mainDataGroup[i] = tool.getMainData(dg[i], 'spend');
        }
        return mainDataGroup;
    }
};

function getY(values){
    var mathData = tool.getMainData(values);
    var digitLevel = mathData.max - mathData.min;
    console.log(mathData);
    var oneTenTh = digitLevel/10;
    // 5   10  20   25  50  100  150   200   250  500
    // if

    var maxY = (Math.ceil(mathData.max/oneTenTh) + 1)*oneTenTh;
    var minY = (Math.floor(mathData.min/oneTenTh) - 1)*oneTenTh;
    if(mathData.min>=0 && minY<0){
        minY = 0;
    }
    return {
        bottom: minY,
        top: maxY,
        scale: oneTenTh
    }
}

var App = React.createClass({
    getInitialState: function() {
        return {
            data: sp.getMainData( sp.groupByPath(this.props.data) ),
            channel: 'avg'
        };
    },
    componentDidMount: function() {
        this.refs['check-avg'].getDOMNode().checked = true;
    },

    render: function() {

        var d = this.state.data;
        var c = this.state.channel;

        var data = [];
        for(var i in d){
            var pathName = i;
            data.push({
                path: pathName,
                spend: d[i][c]
            })
        };
        data.sort(function(a, b){
            return Number(a.path > b.path);
        });
        var labels = data.map(function(item){
            return item.path;
        });
        var values = data.map(function(item){
            return item.spend;
        });

        var summaryData = {
            labels: labels,
            datasets: [
                {
                    label: '过去七天接口/页面的 '+c+' 响应时间',
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: values
                }
            ]
        };



        return (
            <div className="summary chart">
                Summary Data chart
                <br />
                
                <input type="radio" id="channel-avg" name="select-channel" value="avg" ref="check-avg" onChange={this.changeChannel}/>
                <label htmlFor="channel-avg">平均</label>
                <input type="radio" id="channel-max" name="select-channel" value="max" ref="check-max" onChange={this.changeChannel}/>
                <label htmlFor="channel-max">最大</label>
                <input type="radio" id="channel-min" name="select-channel" value="min" ref="check-min" onChange={this.changeChannel}/>
                <label htmlFor="channel-min">最小</label>
                <br />
                
                <Summary data={summaryData}/>
            </div>
        );
    },
    changeChannel: function(e){
        var el = e.target;
        if(el.checked == true){
            this.setState({
                channel: el.value
            })
        }
    }

});

module.exports = App;