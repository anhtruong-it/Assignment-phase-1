const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getUser',  function(req, res) {


    const collection = dbG.collection('users');
    collection.find({}).sort({userId:1}).toArray((err, data)=> {
      if (err) throw err;
      //console.log("users: ", data);

      res.send({"ok":data});

    });



  });

}
