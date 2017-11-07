var UserSQL={
    insert:'INSERT INTO user(username,password,nickname) VALUES (?,?,?)',
    queryALL:'SELECT * FROM user',
    getUserById:'SELECT * FROM user WHERE uid=?',
};
module.exports=UserSQL;