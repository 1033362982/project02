var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/stu-system";

MongoClient.connect(url,function (err,db) {
    db.collection("users").find().toArray(function(err,docs){
        console.log(docs);
        db.close()
    })
})