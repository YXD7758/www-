$(function(){
let layer=layui.layer
let form=layui.form

initArtCateList()

//获取分类列表
function initArtCateList(){
    $.ajax({
        method:'GET',
        url:'/my/article/cates',
        success:function(res){
            let htmlStr=template('tpl-table',res)
$('tbody').html(htmlStr)
            
        }
    })
}

//添加那妞事件
let indexAdd=null
$("#btnAddCate").on('click',function(){
    indexAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
      })
})

//提交渲染页面
$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取失败')
            }
            initArtCateList()
layer.msg('增加成功')
//关闭弹出层
layer.close(indexAdd)
        }
    })
})


// 绑定修改事件
let indexEdit=null
$("tbody").on('click','.btn-edit',function(){
    //修改框
    indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
      })

// 、、发起数据请求修改 
let id=$(this).attr('data-id')
$.ajax({
    method:'GET',
    url:'/my/article/cates/' + id,
    success:function(res){
        form.val('form-edit',res.data)
    }
})
})

//修改并渲染到页面
$("body").on('submit', '#form-edit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
return layer.msg('更新失败')
            }
            layer.msg('更新成功')
            // console.log(indexEdit);
            layer.close(indexEdit)
            initArtCateList()
        }
    })
})



//删除事件
$("tbody").on('click','.btn-delete',function(){
let id=$(this).attr('data-id')
//弹出框
layer.confirm('是否删除',{icon:3,title:'提醒'},function(index){
    $.ajax({
        method:'GET',
        url:'/my/article/deletecate/' + id,
        success:function(res){
            if(res.status!==0){
return layer.msg('删除失败')
            }
            layer.msg('删除成功')
            layer.close(index)
            initArtCateList()
        }
    })
})
})



























})