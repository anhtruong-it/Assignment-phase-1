const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.post('/api/getChannelforUser',  function(req, res) {
    var channelList=[];
    var newChannels=[];
    console.log("works!");
    const userId = Number(req.body.userId);
    const collection = dbG.collection('users');
    collection.find({userId: userId}).toArray((err, data)=>{
      console.log("user: ", data[0].groupId);
      data[0].groupId.forEach(c=>{
        channelList.push(c.channelId);
      })
      console.log("channel: ", channelList);
      const channel = dbG.collection('channels');

      const check = channelList[(channelList.length)-1];
      channelList.forEach(id=>{
        channel.find({channelId: Number(id)}).toArray((err, data1)=>{
          newChannels.push(data1[0].channelName);
          if (check==id){
            console.log("stop", newChannels);

            res.send({"ok": newChannels});
          }
        })
      })



    })

  });
}
