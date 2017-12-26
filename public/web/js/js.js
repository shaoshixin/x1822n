layui.use(['form', 'layer', 'element'], function () {
    var $ = layui.jquery;
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var layer = layui.layer;
    var form = layui.form;
    //监听导航点击
    element.on('nav(nav)', function (elem) {
        console.log(elem);
        layer.msg("123");
    });
    form.on('submit(btn-login)', function (data) {
        data.form.action = "login/loginSub";
        data.form.submit();
    });
    // $(document).on('click','#btn-login',function () {
    //     document.login_form.action = "login/loginSub";
    //     document.login_form.submit();
    // });
    $(document).on('click','#btn-register',function () {
        //阻止表单提交，显示注册界面
        var event = event || window.event;
        event.preventDefault(); // 兼容标准浏览器
        window.event.returnValue = false; // 兼容IE6~8
       layer.msg("注册");
    });
});