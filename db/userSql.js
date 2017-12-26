var UserSQL={
    insert:'INSERT INTO user(username,password,nickname) VALUES (?,?,?)',
    queryALL:'SELECT * FROM user',
    getUserByUsername:'SELECT * FROM user WHERE username=?',//查询某个username下的所有信息
    login:'SELECT * FROM user WHERE username=? and password=?',//登录
};
module.exports=UserSQL;