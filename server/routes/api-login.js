const { async } = require("rxjs");

module.exports = function(dbG, app, ObjectID) {

  app.post('/api/login',  function(req, res) {

    userNames = req.body.userName;
    userPwds = req.body.userPwd
    const collection = dbG.collection('users');
    collection.find({userName: userNames, userPwd: userPwds}).toArray((err, data)=> {
      if (err){
          console.log("[[]]");
          res.send(err);
        }
        else {

         res.send({"ok":data[0]});
        }
    });
  });
}
