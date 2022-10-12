const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.post('/api/getlist',  function(req, res) {
    console.log('user:ok');
    const userId = req.body.userId;
    const collection = dbG.collection('users');
    collection.find({userId: Number(userId)}).toArray((err, data)=> {
      console.log('user: ', data);
      res.send({"ok": data[0]})

    });


    //console.log('datas: ',  datas);

  });

}
