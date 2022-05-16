$(function(){

let form=layui.form
let layer=layui.layer
form.verify({
   nickname:function(value){
    if(value.length>6){
return '昵称在1--6字符'
    }
   }
})


initUserInfo()
//初始化信息
function initUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
return layer.msg('获取失败')
            }
        // 调用 表单赋值
        form.val('formUserInfo',res.data)
        }
    })
}



//重置表单
$("#btnReset").on('click',function(e){
e.preventDefault()
initUserInfo()
})


//监听表单提交事件
$(".layui-form").on('submit',function(e){
    e.preventDefault()
    // 发起请求
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
return layer.msg('更新失败')
            }
            layer.msg('更新成功')
            window.parent.getUserInfo()
        }
    })
})
})