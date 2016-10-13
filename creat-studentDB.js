var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/stu-system";

MongoClient.connect(url,function(err,db){
    var student1 ={
        "number":"001",
        "name":"赵",
        "age":"14",
        "sex":"男",
        "success":"80",
    }
    db.collection("students").insertOne(student1,function(){
        db.close()
    });
})