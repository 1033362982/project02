var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/stu-system";
//引入数据库

function getdata(next){
    MongoClient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
//获取学生数据

function insertdata(options,next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("students").insertOne(options,function (data) {
            getdata(function (data) {
                next(data)
            })
            db.close()
        })
    })
}
//添加学生数据

function removedata(condition,next) {
    MongoClient.connect(url,function (err,db) {
        db.collection("students").removeOne(condition,function (data) {
            getdata(function (data) {
                next(data)
            })
            db.close()
        })
    })
};
//删除学生数据

function updatedata(condition,options,next) {
    MongoClient.connect(url,function (err,db) {
        var cond = {"number":condition}
        db.collection("students").updateOne(cond,options,function (data) {
            getdata(function (data) {
                next(data)
            })
            db.close()
        })
    })
};

function insupd(options,next){
    //0添加
    //1修改
    MongoClient.connect(url,function(err,db){
        var condition={"number":options}
        db.collection("students").find(condition).toArray(function(err,docs){
            if(docs.length==0){
                next(0)
            }else{
                next(1)
            }
        })
    })
}
//添加修改判断

function sexmale(next) {
    MongoClient.connect(url,function(err,db){
        db.collection("students").find({"sex":"男"}).toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
//筛选男

function sexfemale(next) {
    MongoClient.connect(url,function(err,db){
        db.collection("students").find({"sex":"女"}).toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
//筛选女

function successbubble(next) {
    MongoClient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            var len=docs.length;
            for (var i = len;i>=2;i--) {
                for (var j= 0;j<i-1 ;j++) {
                    var suc1=docs[j].success
                    var suc2=docs[j+1].success
                    if(suc1<suc2){
                        var obj=docs[j]
                        docs[j]=docs[j+1];
                        docs[j+1]=obj;
                    }
                };
            };
            next(docs);
            db.close()
        })
    })
}
//学生成绩排序

function agebubble(next) {
    MongoClient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            var len=docs.length;
            for (var i = len;i>=2;i--) {
                for (var j= 0;j<i-1 ;j++) {
                    var suc1=docs[j].age
                    var suc2=docs[j+1].age
                    if(suc1<suc2){
                        var obj=docs[j]
                        docs[j]=docs[j+1];
                        docs[j+1]=obj;
                    }
                };
            };
            next(docs);
            db.close()
        })
    })
}
//学生年龄排序



module.exports={
    getdata:getdata,
    insertdata:insertdata,
    removedata:removedata,
    updatedata:updatedata,
    insupd:insupd,
    sexmale:sexmale,
    sefemale:sexfemale,
    successbubble:successbubble,
    agebubble:agebubble
}