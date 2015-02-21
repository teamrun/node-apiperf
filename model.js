var NEDB = require('nedb');



function modelGen(config){
    var db = new NEDB({
        // filename: __dirname + '/perf_db',
        filename: config.dbfile,
        autoload: true 
    });
    return op = {
        save: function(d){
            return new Promise(function(resolve, reject){
                db.insert(d, function(err, doc){
                    err? reject(err) : resolve(doc);
                });
            });
        },
        query: function(query){
            return new Promise(function(resolve, reject){
                db.find(query, function(err, doc){
                    err? reject(err) : resolve(doc);
                });
            });
        },
        del: function(query){
            return new Promise(function(resolve, reject){
                db.remove(query, function(err, doc){
                    err? reject(err) : resolve(doc);
                });
            });
        }
    }
}

module.exports = modelGen;