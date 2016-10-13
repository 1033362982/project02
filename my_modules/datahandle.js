var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/stu-system";

function checkUser(options,next) {
    //0 用户名不存在
    //1 密码错误
    //2 登陆成功
    MongoClient.connect(url,function(err,db){
        db.collection("users").find().toArray(function(err,docs){
            db.close()
            for(var i=0;i<docs.length;i++){
                if(options.email==docs[i].email){
                    if(options.password==docs[i].password){
                        // console.log(docs[i].username)
                        next(docs[i].username);
                        return
                    }else{
                        next(1);
                        return
                    }
                }
            }
            next(0);
            return
        })
    })
};
module.exports={
    checkUser:checkUser
}