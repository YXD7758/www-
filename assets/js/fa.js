$(function() {
    var layer = layui.layer
    var form = layui.form
  
    initCate()
    initEditor()
    // 定义加载文章分类的方法
    function initCate() {
      $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg('初始化文章分类失败！')
          }
          // 调用模板引擎，渲染分类的下拉菜单
          var htmlStr = template('tpl-cate', res)
          $('[name=cate_id]').html(htmlStr)
          // 一定要记得调用 form.render() 方法
          form.render()
        }
      })
    }

//初始化裁剪器
let $image=$('#image')

// 配置
let options={
  aspectRatio:400/200,
  preview:'.img-preview'
}


$image.cropper(options)




//模拟上传文件
$("#btnChooseImage").on('click',function(){
  $("#coverFile").click()
})


//监听文件变化事件
$("#coverFile").on('change',function(e){
  let files=e.target.files
  if(files.length===0){
return
  }
  // 获取成功创建地址
  var newImgURL = URL.createObjectURL(files[0])

// 重新渲染图片

$image
.cropper('destory')
.attr('src',newImgURL)
.cropper(options)
})



//发布事件
let art_state='已发布'


//草稿事件

$('#btnSave2').on('click',function(){
  art_state='草稿'
})


// 提交发布事件
$("#form-pub").on('submit',function(e){
e.preventDefault()
//获取表单的内容

let fd=new FormData($(this)[0])
//文章的状态保存回掉函数里
fd.append('state',art_state)

//图片转换文件上传
$image
.cropper('getCroppedCanvas',{
  width: 400,
   height: 280
})
.toBlob(function(blob) {
  // 将 Canvas 画布上的内容，转化为文件对象
  // 得到文件对象后，进行后续的操作
  // 5. 将文件对象，存储到 fd 中
  fd.append('cover_img', blob)
  // 6. 发起 ajax 数据请求
  publishArticle(fd)

})

})


//发布文章的方法

function publishArticle(fd){
  $.ajax({
    method:'POST',
    url:'/my/article/add',
    data:fd,
    
    contentType:false,
    processData:false,
    success:function(res){
      if(res.status!==0){
return layer.msg('发布失败')
      }
layer.msg('发布成功')
location.href='/user/lie.html'
    }
  })
}

})