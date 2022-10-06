const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getUser',  function(req, res) {


    const collection = dbG.collection('users');
    collection.find({}).toArray((err, data)=> {
      if (err) throw err;
      console.log("users: ", data);
      res.send({"ok":data});

    });


    //console.log('datas: ',  datas);

  });

}
