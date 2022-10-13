const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getChannels',  function(req, res) {
    var channelList=[];
    const collectionG = dbG.collection('channels');
    collectionG.find({}).toArray((err, data)=> {
      if (err) throw err;
      data.forEach(d=>{
        channelList.push(d.channelName);
      })
      res.send({"ok":channelList});
    });
  });
}
