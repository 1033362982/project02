$(".insertdata").click(function(){
    $("#myModal").modal();
    $(".number").removeAttr("readonly")
});
//模态框点击事件

$.ajax({
    "method":"get",
    "url":"/getstudata",
}).done(function(data){
    showdata(data)
})
//显示学生数据

$(".myform").submit(function(){
    var data = $(this).serialize();
    $.ajax({
        "method":"post",
        "url":"/insertstudata",
        "data":data
    }).done(function(data){
        // console.log(data)
        showdata(data)
    })
    $("#myModal").modal("hide");
    return false
})
//添加学生数据

$("table tbody").delegate(".removedata","click",function(){
    var number=$(this).attr("data_num");
    var condition={"number":number};
    if(confirm("是否删除此条数据")){
        $.ajax({
            "method":"post",
            "url":"/removestudata",
            "data":condition
        }).done(function(data){
            showdata(data)
        })
    }
})
//删除学生数据

$("table tbody").delegate(".updatedata","click",function(){
    $("#myModal").modal();
    var number=$(this).attr("data_num");
    $(".number").val(number).attr("readonly","readonly");
})
//修改学生数据

$(".sexmale").click(function(){
    $.ajax({
        "method":"get",
        "url":"/sexmale",
    }).done(function(data){
        showdata(data)
    })
})
//筛选男

$(".sexfemale").click(function(){
    $.ajax({
        "method":"get",
        "url":"/sexfemale",
    }).done(function(data){
        showdata(data)
    })
})
//筛选女

$(".successsort").click(function () {
    $.ajax({
        "method":"get",
        "url":"/successsort",
    }).done(function(data){
        showdata(data)
    })
})
//按成绩排序

$(".agesort").click(function () {
    $.ajax({
        "method":"get",
        "url":"/agesort",
    }).done(function(data){
        showdata(data)
    })
})







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
        tr.append("<td><button class='removedata' data_num='" + data[i].number + "'>删除</button></td>")
        $("table tbody").append(tr)
        tr.append("<td><button class='updatedata' data_num='" + data[i].number + "'>修改</button></td>")
        $("table tbody").append(tr)
    }
}