$(function() {
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 情况本地token
            localStorage.removeItem('token')
                // 跳转登录页
            location.href = '/login.html'
                // 关闭询问框
            layer.close(index);
        });
    })


    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用renderAvatar渲染
                renderAvatar(res.data)
            },
            // 无论成功还是失败都调用这个函数
            // complete: function(res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 强制清空token
            //         localStorage.removeItem('token')
            //             // 强制跳转
            //         location.href = '/login.html'
            //     }
            // }
        })
    }

    // 渲染用户的头像
    function renderAvatar(user) {
        // 获取用户名称
        var name = user.nickname || user.username
            // 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 按需渲染用户的头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avater').hide()
        } else {
            // 按文本渲染
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }

    }
})