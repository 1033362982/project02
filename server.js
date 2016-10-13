var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session")
var studentshandle=require("./my_modules/studentshandle")
var usershandle=require("./my_modules/usershandle");
var datahandle=require("./my_modules/datahandle")
var app= express()
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:"false"}));
app.use(session({
    "secret":"lisa",
    "cookie":{maxAge:50000*1000}
}))
app.set("view engine","jade");
app.listen(3000,function () {
    console.log("服务器已经启动")
});
app.get("/",function(req,res){
    var h3info=req.query.showinfo
    res.render("login",{info:h3info})
});
//进入登陆页

app.post("/login",function(req,res){
    var data=req.body;
    datahandle.checkUser(data,function (result) {
        if(result==0){
            res.redirect("/?showinfo=用户名不存在")
        }else if(result==1){
            res.redirect("/?showinfo=密码错误")
        }else{
            req.session.username=result
            res.redirect("/users")
        }
    })
});
//登陆页用户验证

app.get("/users",function(req,res){
    if(req.session.username){
            res.render("users",{user:req.session.username})
    }else{
        res.redirect("/")
    }
});
//用户登录显示

app.get("/getuserdata",function(req,res){
    usershandle.getdata(function(data){
        res.send(data)
    })
})
//显示用户页面数据

app.post("/insertuserdata",function(req,res){
    var data1=req.body;
    usershandle.insertdata(data1,function(data){
        res.send(data)
    })
});
//添加用户数据

app.post("/removeuserdata",function (req,res){
    usershandle.removedata(req.body,function (data) {
        res.send(data)
    })
})
//删除用户数据



////////////////////////////////////////////////////////////////////



app.get("/students",function(req,res){
    if(req.session.username){
        res.render("students",{user:req.session.username})
    }else{
        res.redirect("/")
    }
});
//学生页面显示

app.get("/getstudata",function(req,res){
    studentshandle.getdata(function(data){
        res.send(data)
    })
})
//显示学生页面数据

app.post("/insertstudata",function(req,res){
    var condition =req.body.number;
    var data=req.body
    studentshandle.insupd(condition,function (num) {
        if(num==0){
            studentshandle.insertdata(data,function (docs) {
                res.send(docs)
            })
        }else if(num==1){
            studentshandle.updatedata(condition,data,function (docs) {
                res.send(docs)
            })
        }
    })
})
//添加和修改学生数据

app.post("/removestudata",function(req,res){
    studentshandle.removedata(req.body,function(data){
        res.send(data)
    })
});
//删除学生数据

app.get("/sexmale",function (req,res) {
    studentshandle.sexmale(function (data) {
        res.send(data)
    })
})
//筛选男

app.get("/sexfemale",function (req,res) {
    studentshandle.sefemale(function (data) {
        res.send(data)
    })
})
//筛选女

app.get("/successsort",function(req,res){
    studentshandle.successbubble(function(data){
        res.send(data)
    })
})
//筛选成绩


app.get("/agesort",function(req,res){
    studentshandle.agebubble(function(data){
        res.send(data)
    })
});
//筛选年龄