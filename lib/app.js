var React = require('react');
var App = require('./component/app');

var perfData = JSON.parse(perfDataStr);

React.render(<App data={perfData} />, document.querySelector('#ctn'));
