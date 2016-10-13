var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/stu-system";

function getdata(next){
    MongoClient.connect(url,function(err,db){
        db.collection("users").find().toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
//获取用户数据

function insertdata(options,next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("users").insertOne(options,function (data) {
            getdata(function (data) {
                next(data)
            })
            db.close()
        })
    })
}
//添加用户数据

function removedata(condition,next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("users").removeOne(condition,function (data) {
            getdata(function (data) {
                next(data)
            })
            db.close()
        })
    })
};
//删除用户数据

module.exports={
    getdata:getdata,
    insertdata:insertdata,
    removedata:removedata
}
//暴漏接口