var modelGen = require('./model');
var pageServer = require('./page');


function buildDataItem(start, end, ctx){
    var d = {
        // 时间
        ts: start,
        spend: end - start,
        // req
        path: ctx.path,
        query: ctx.query,
        // res
        httpCode: ctx.status,
        size: ctx.length
        // stream的size计算 需要监听事件什么的...先不管了
    };
    if(ctx.apiPerfVerbose){
        d.verbose = ctx.apiPerfVerbose;
    }

    return d;
}

// 通过content-type判定是否是page或api
function isPageType(ctx){
    return (ctx.type == 'text/plain' || ctx.type == 'text/html') && (ctx.path !== '/favicon.ico')
}
function isApiType(ctx){
    return ctx.type == 'application/json';
}



function isSelf(ctx){
    return /^\/api-perf\//.test(ctx.path) || ctx.path == '/api-perf';
}



function gen(config){
    config = config || {};
    console.log('binding api-performance tool...');

    // 构建needRecord 是否需要记录的判断方法
    var needRecord;
    var checkPage, checkApi;
    // default
    checkPage = isPageType;
    checkApi = isApiType;

    if(config.tests){
        if(config.tests.page){
            checkPage = function(ctx){
                return config.tests.page.test(ctx.path);
            }
        }
        if(config.tests.api){
            checkApi = function(ctx){
                return config.tests.api.test(ctx.path);
            }
        }
    }
    // 是否记录自己的性能
    if(config.perfSelf){
        needRecord = function (ctx) {
            return (isPageType(ctx) || isApiType(ctx));
        }
    }
    else{
        needRecord = function (ctx) {
            return (isPageType(ctx) || isApiType(ctx)) && !isSelf(ctx);
        }
    }

    
    
    var Model = modelGen(config);

    return function*(next){

        var start = Date.now();

        if(this.path.indexOf('/api-perf') == 0){
            yield pageServer(Model).call(this);
        }
        else{
            // 之后的api或者page的路由处理中可以自己添加一个 this.apiPerfVerbose 数组
            // 来添加额外的数据
            // yield完成之后会自动保存到数据库
            yield next;
        }
        

        if( needRecord(this) ){
            var end = Date.now();
            var d = buildDataItem(start, end, this);
            setTimeout(function(){
                Model.save(d);
            });
            console.log(d);
        }
    }
}

module.exports = gen;