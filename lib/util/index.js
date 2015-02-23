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
    },
    // 获取重要的三个数学指标
    // 一系列数字
    // 或 数字数组
    // 或 对象数组
    getMainData: function(){
        var supposeArr = arguments[0];
        var getDigit;

        if(Array.isArray(supposeArr)){
            if(typeof supposeArr[0] == 'object'){
                var dataProp = arguments[1];
                getDigit = function(d){
                    return d[dataProp];
                }
            }
            else if(typeof supposeArr[0] == 'number'){
                getDigit = function(d){
                    return d;
                }
            }
            else{
                throw new Error('wrong param')
            }
        }
        else if(typeof supposeArr == 'number') {
            supposeArr = [].slice.call(arguments, 0);
            getDigit = function(d){
                    return d;
                }
        }
        else{
            throw new Error('wrong param');
        }

        var min=Infinity, max=-Infinity, sum=0;
        supposeArr.forEach(function(d, i){
            var dd = getDigit(d);
            if(dd<min){
                min = dd;
            }
            if(dd>max){
                max = dd;
            }
            sum += dd;
        });
        return {
            min: min,
            max: max,
            avg: sum/supposeArr.length
        }
    }
};

[cssjs, vanilla$].forEach(function(lib){
    for(var i in lib){
        util[i] = lib[i].bind(lib);
    }
});


module.exports = util;