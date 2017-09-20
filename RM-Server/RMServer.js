var http = require('http');

var express = require("express");
var server = express();
var mongodb = require('mongodb').MongoClient;

var bodyParser = require('body-parser')

server.use(bodyParser.json());

// parse application/vnd.api+json as json
server.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));


var collections;
var database;

mongodb.connect('mongodb://vivek:Mind123@ds147872.mlab.com:47872/testdb508', function(err, db) {
    console.log("Database is online now!");
    database = db;
    // collections = db.collection('vivekResume');
    // // Insert some documents
    // collections.insertOne({ name: 'Vivek kumar verma' }, function(err, r) {
    //     console.log(r.insertedCount);
    // });
    // collections.find({ name: 'Vivek' }).toArray(function(err, docs) {
    //     return docs;
    // });
});

var port = process.env.PORT || 8080;

server.listen(port, function() {
    console.log('Example app listening on port 3000!')
})

server.get("/", function(req, res) {
    res.send("welcome")
})

server.get("/testRes", function(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    var data = database.collection('vivek');

    data.find({ name: 'Vivek' }).toArray(function(err, doc) {
        console.log(doc);
        res.send(doc);
    });


})

server.post("/saveData", function(req, res) {
    console.log(req.body.id);
    console.log(req.body.user);

    res.send(req.body.id + 'success' + req.body.user[0]);

})

server.get("/testReq", function(req, res) {
    res.send("This is my request")
})