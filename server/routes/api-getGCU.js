const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getGCU',  function(req, res) {

    const collection = dbG.collection('GCUs');
    collection.find({}).toArray((err, data)=> {
      //console.log("GCU: ", data);

      data.forEach(group =>{
        console.log('group: ', group.groupID);
        //console.log(group.channel);

        group.channel.forEach(channel =>{
          console.log('channel: ',channel.channelId);

          channel.user.forEach(user => {
            console.log('user: ', user.userId);
          })
        });

      });

      res.send({'ok':data});
    });
  });
}
