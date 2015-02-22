var fs = require('fs');
var path = require('path');

var tool = require('./lib/util')

var pagePath = path.resolve(__dirname, './views/index.html');
var libPath = path.resolve(__dirname, './lib');
var bundlePath = path.resolve(libPath, 'bundle.js');

function getDataOfLast7(Model){
    return Model.query({
        ts:{
            $gt: Date.now() - 7*24*3600*1000
            // $gt: Date.now() - 2*3600*1000
        }
    })
}



module.exports = function(Model){
    return function*(){
        // ctx.body = 'why not work';

        // serve js
        if(this.path == '/api-perf/lib/bundle.js'){
            this.type = 'javascript';
            this.body = fs.createReadStream(bundlePath);
        }
        // serve page
        else{
            this.type = 'html';
            var content = yield tool.promisify(fs.readFile)(pagePath, 'utf-8');
            var data = yield getDataOfLast7(Model);
            content = content.replace('{{data}}', JSON.stringify(data));
            // console.log(content)
            this.body = content;
        }
    };
}