const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/testChannel',  function(req, res) {


    const collection = dbG.collection('channels');
    collection.find({}).toArray((err, data)=> {
        res.send({"ok": data});

    });


    //console.log('datas: ',  datas);

  });

}
