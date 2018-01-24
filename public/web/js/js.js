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
    //监听登录提交提交
    form.on('submit(btn-login)', function (data) {
        $.ajax({
            type: 'POST',
            url: 'login/loginSub',
            cache: false,
            async: false,
            dataType: 'json',
            data: data.field
        }).done(function (res) {
            if (res.code == 200) {
                layer.msg('登录成功，正在跳转……', {icon: 1});
                location.href = "/";
            } else {
                layer.alert('用户名或密码错误!');
            }
        });
        return false;
    });
    // form.on('submit(btn-login)', function (data) {
    //     data.form.action = "login/loginSub";
    //     data.form.submit();
    // });
    //阻止注册按钮提交，绑定新事件
    $(document).on('click', '#btn-register', function () {
        //阻止表单提交，显示注册界面
        // var event = event || window.event;
        // window.event.returnValue = false; // 兼容IE6~8
        // event.preventDefault(); // 兼容标准浏览器
        layer.open({
            type:2,
            title:'注册',
            content:'login/register',
            area: ['400px', '500px']
        });


        //layer.alert("注册");
        return false;//layui的阻止表单提交
    });
    //监听注册提交
    form.on('submit(btn-register-sub)', function (data) {
        $.ajax({
            type: 'POST',
            url: 'addUser',
            cache: false,
            async: false,
            dataType: 'json',
            data: data.field
        }).done(function (res) {
            if (res.code == 200) {
                layer.msg('注册成功', {icon: 1});
                location.href = "/";
            } else {
                layer.alert('请检查后重新注册！');
            }
        });
        return false;
    });
});