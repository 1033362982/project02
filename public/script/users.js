$(".insertdata").click(function(){
    $("#myModal").modal();
    $(".myform").attr("action","/insertuserdata")
});
//模态框点击事件
$.ajax({
    "method":"get",
    "url":"/getuserdata",
}).done(function(data){
    showdata(data)
})
//显示用户数据

$(".myform").submit(function(){
    var data = $(this).serialize();
    $.ajax({
        "method":"post",
        "url":"/insertuserdata",
        "data":data
    }).done(function(data){
        console.log(data)
        showdata(data)
    })
    $("#myModal").modal("hide");
    return false
})
//添加数据

$("table tbody").delegate(".removedata","click",function(){
    var email=$(this).attr("data_num");
    var condition={"email":email};
    if(confirm("是否删除此条数据")){
        $.ajax({
            "method":"post",
            "url":"/removeuserdata",
            "data":condition
        }).done(function(data){
            showdata(data)
        })
    }
})
//删除数据

function showdata(data){
    $("table tbody").empty()
    for(var i in data){
        var tr = $("<tr>");
        var n=0;
        for(var j in data[i]){
            if(n==1){
                var td = $("<td>");
                var sx = data[i][j];
                td.text(sx);
                tr.append(td)
            }
            n=1
        }
        tr.append("<td><button class='removedata' data_num='" + data[i].email + "'>删除</button></td>")
        $("table tbody").append(tr)
    }
}
//显示数据函数