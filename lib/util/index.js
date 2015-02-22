var cssjs = require('./css');
var vanilla$ = require('./vanilla$');

var util = {
    promisify: function(fn, context){
        return function(){
            var args = Array.prototype.slice.call(arguments);
            return new Promise(function(resolve, reject){
                var callback = function(err, data){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(data);
                    }
                };
                fn.apply(context, args.concat([callback]));
            });
        }
    }
};

[cssjs, vanilla$].forEach(function(lib){
    for(var i in lib){
        util[i] = lib[i].bind(lib);
    }
});


module.exports = util;