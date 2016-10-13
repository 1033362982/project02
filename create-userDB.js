var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/stu-system";

MongoClient.connect(url,function(err,db){
    var user2={
        "username": "Mike",
        "email":"1234567890@qq.com",
        "password":"567890"
    }
    db.collection("users").removeOne({"age":"111"},function () {
        db.close()
    })
})