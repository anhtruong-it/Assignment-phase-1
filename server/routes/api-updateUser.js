module.exports = function(dbG, app, ObjectID) {

  var result;
  app.post('/api/updateUser', function(req, res) {

    if (!req.body) { return res.sendStatus(400)}
    user = req.body;
console.log("product22: ");
console.log("product22: ",[user.userId, user.userName, user.userPwd, user.userRole]);
    //var objectid = new ObjectID(user);
    const collection = dbG.collection('users');
        collection.updateOne({userId: user.userId}, {$set: { userName: user.userName, userPwd: user.userPwd, userRole: user.userRole}}, (err, data)=> {

          if (err) {
            res.send({"ok":"no"});
          }
          else {
            res.send({"ok":"ok"});
          }

    });

  });

}
