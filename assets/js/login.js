$(function() {
    // 点击去注册的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了pwd规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // 形参的值是确认密码框的内容
            // 在拿到密码框中的内容
            // 进行等于判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })



    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var date = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', date, function(res) {
            if (res.status !== 0) {
                console.log(1);
                return layer.alert(res.message);
            }
            layer.alert('注册成功');
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登陆表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        date = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.post('/api/login', date, function(res) {
            if (res.status !== 0) {
                return layer.alert(res.message);
            }
            layer.alert('登陆成功');
            // 将登陆成功的token字符串保存到localStorage
            localStorage.setItem('token', res.token)
                // 跳转后台
                // location.href = '/index.html'
        })
    })
})