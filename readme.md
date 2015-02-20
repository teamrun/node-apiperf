# config

最开始 只提供页面和api的res-time记录, 提供一些perf数据的查询

记录页面: 用`content-type:text/plain` 或者`text/html`来统计
api: 提供一个test的config入口, 以什么格式实现的接口路由算是api
以及application/json的接口

默认: 记录`text/plain`, `text/html`, `application/json`的返回耗时
配置: test, 模仿webpack接收一个RegExp, 对path进行test
    
    app.use(apiPerf({
        tests: {
            page: /\.html$/,
            api: /\^/api\//
        } 
    }));



以后可以引入worker, co-routine, msg-que