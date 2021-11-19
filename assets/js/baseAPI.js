// 每次调用$.post $.get $.ajax 都会调用这个对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局挂载
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
                // 强制跳转
            location.href = '/login.html'
        }
    }
})