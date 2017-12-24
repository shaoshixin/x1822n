layui.use('form',function () {
var form = layui.form;
form.on('submit(loginSub)',function (data) {
    userName=data.field.username;
    passWord=data.field.password;
    alert(userName);
    // $.ajax({
    //     url:'/loginSub',
    //     type:'POST',
    //     data:{
    //         "uName":userName,
    //         "uPWd":passWord
    //     }
    // });
    });
});