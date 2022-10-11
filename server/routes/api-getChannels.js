const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getChannels',  function(req, res) {


    var channelList=[];
    const collectionG = dbG.collection('channels');

    collectionG.find({}).toArray((err, data)=> {
      if (err) throw err;
      //console.log('d:', data);
      //res.send({"ok":data});
      data.forEach(d=>{
        channelList.push(d.channelName);
      })
      //console.log('d:', channelList);
      res.send({"ok":channelList});
    });



    //console.log('datas: ',  datas);

  });

}
