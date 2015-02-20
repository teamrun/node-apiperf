var koa = require('koa');
var apiPerf = require('../');


function wait(ms){
    return new Promise(function(res, rej){
        setTimeout(res, ms);
    });
}


var app = koa();

app.use(apiPerf());


app.use(function* (){
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
            this.body += '<br><a href="/dadada">UnknownPage</a>';
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