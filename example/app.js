var koa = require('koa');
var path = require ('path');
var apiPerf = require('../');


function wait(ms){
    return new Promise(function(res, rej){
        setTimeout(res, ms);
    });
}


var app = koa();
app.use(function*(next){
    try{
        yield next;
    }
    catch(err){
        // console.log(err)
        console.log(err.stack)
    }
})

app.use(apiPerf({
    tests: {
        api: /^\/api\//
    },
    perfSelf: false,
    dbfile: path.resolve(__dirname, '../perf_db')
}));


app.use(function* (){
    // 等候一个随机值
    yield wait(Math.random()*500);
    switch(this.path){
        // text/plain
        case '/':
            this.body = 'Hello, koa middleware';
            break;
        case '/index.html':
            this.type = 'text/html';
            this.body = '<h2>Hello, page hosted by koa</h2>';
            this.body += '<br><a href="/">Home text/plain</a>';
            this.body += '<br><a href="/api/foo">json api</a>';
            this.body += '<br><a href="/dadada">404页面</a>';
            break;
        // json
        case '/api/foo':
            this.body = {
                code: 200,
                msg: 'bar'
            };
            break;
        default:
            this.status = 404;
            this.body = 'Ooops~, you are lost';
            break;
    }
});


var port = 4001;
app.listen(port, function(){
    console.log('server is listen at:', port);
});