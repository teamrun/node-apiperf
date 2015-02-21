var fs = require('fs');
var path = require('path');

var pagePath = path.resolve(__dirname, './views/index.html');
var libPath = path.resolve(__dirname, './lib');
var bundlePath = path.resolve(libPath, 'bundle.js');



module.exports = function(){
    if(this.path == '/api-perf/lib/bundle.js'){
        this.type = 'javascript';
        this.body = fs.createReadStream(bundlePath);
    }
    else{
        this.type = 'html';
        this.body = fs.createReadStream(pagePath);
    }
}