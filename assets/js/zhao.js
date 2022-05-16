var layer = layui.layer
let $image=$("#image")
const options={
    aspectRatio:1,
    preview:'.img-preview'
}
$image.cropper(options)
//用户选择照片




//按钮点击事件上传文件
$("#btn").on('click',function(){
  
    $(".www").click()
})
//上传照片
$('.www').on('change',function(e){
let filelist=e.target.files
if(filelist.length===0){
return ('选择照片')
}

// 拿到照片转换路径
let file=e.target.files[0]
let imgURL=URL.createObjectURL(file)
$image
.cropper('destroy')//销毁就得裁剪

.attr('src',imgURL)//、、重新设置路径
.cropper(options)//重新初始化

})
//确定按钮绑定事件
$("#m").on('click',function(){
    let dataURL=$image
    .cropper('getCroppedCanvas',{
        width:100,
        height:100,
    })

.toDataURL('image/png')
$.ajax({
    method:'POST',
    url:'/my/update/avatar',
    data:{
        avatar:dataURL
    },
    usccess:function(res){
if(res.atstus!==0){
return layer.msg('更换头像失败')
}
layer.msg('更换头像成功')
window.parent.getUserInfo
    }
})

})