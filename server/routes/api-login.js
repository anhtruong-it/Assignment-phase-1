const { async } = require("rxjs");

module.exports = function(dbG, app, ObjectID) {

  app.post('/api/login',  function(req, res) {

    userNames = req.body.userName;
    userPwds = req.body.userPwd
    console.log('u, p: ', [userNames, userPwds])
    const collection = dbG.collection('users');
    console.log("login");
    collection.find({userName: userNames, userPwd: userPwds}).toArray((err, data)=> {

      if (err){
          console.log("[[]]");
          res.send(err);
        }
        else {
         /// console.log(data[0].userRole);
          res.send({"ok":data[0]});
        }
      //res.send({"ok": data});

    });


    //console.log('datas: ',  datas);

  });

}
