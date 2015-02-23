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
            this.type = 'application/javascript';
            this.body = fs.createReadStream(bundlePath);
        }
        else if(this.path == '/api-perf/lib/bundle.js.map'){
            this.type = 'application/javascript';
            this.body = fs.createReadStream(bundlePath+'.map');
        }
        // serve page
        else{
            this.type = 'html';
            console.time('api-perf html');
            var content = yield tool.promisify(fs.readFile)(pagePath, 'utf-8');
            var data = yield getDataOfLast7(Model);
            content = content.replace('{{data}}', JSON.stringify(data));
            // console.log(content)
            console.timeEnd('api-perf html');
            this.body = content;
        }
    };
}