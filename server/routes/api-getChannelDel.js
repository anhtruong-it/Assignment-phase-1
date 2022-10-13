const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getChannelDel',  function(req, res) {
    var channelList=[];
    const collectionG = dbG.collection('channels');
    collectionG.find({}).toArray((err, data)=> {
      if (err) throw err;
      console.log('c: ', data[0]);
      res.send({"ok":data});
    });
  });
}
