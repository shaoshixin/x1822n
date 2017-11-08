# x41822n
写：http://localhost:3000/users/addUser?username=helloMySQL&password=helloMySQL&nickname=helloMySQL

app.render(view,[options],callback) 渲染view，callback用来处理返回的渲染后的字符串
app.use([path], function) 使用中间件 function,可选参数path默认为"/"。使用 app.use() “定义的”中间件的顺序非常重要，它们将会顺序执行，use的先后顺序决定了中间件的优先级(经常有搞错顺序的时候);