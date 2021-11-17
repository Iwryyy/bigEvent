// 每次调用$.post $.get $.ajax 都会调用这个对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})