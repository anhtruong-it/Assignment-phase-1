module.exports = function(dbG, app, ObjectID) {

  app.post('/api/removeUser', function(req, res) {

    if(!req.body) { return res.sendStatus(400);}
    console.log("remove user");
    userId = Number(req.body.userId);
    groupId = req.body.groupId;
    channelId = req.body.channelId;
    console.log(userId, groupId, channelId);

    const collection = dbG.collection('GCUs');
    collection.find({groupId}).toArray((err, data) =>{
      if (err) throw err;
      console.log("GCUs: ", data[0]);
      var groupName = data[0].groupName;
      var i = 0;
      newA = []
      for(let c of data[0].channel) {
        console.log("c", c.channelId, channelId);
        if (Number(c.channelId) != Number(channelId)){
          i += 1;
          newA.push(c);
        } else {
          break;
        }
      }
      console.log("i = ", i);
      console.log('channel: ', data[0].channel[i]);
      var j = 0;

      for(let u of data[0].channel[i].user) {
       // console.log("u = ", u);
        if (Number(u.userId) != Number(userId)) {
          j += 1;

        } else {
          break;
        }
      }
     // console.log(data[0].channel[i].user[j]);
      data[0].channel[i].user.splice(j,1);
      console.log('channel: ', data[0].channel[i]);
      console.log('newA: ', data[0]);
      console.log('newA2: ', data[0].channel);
      collection.updateOne({groupId:Number(groupId)}, {$set:{groupName: groupName, channel: data[0].channel}}, (err, data)=>{
        console.log(data);
        res.send({"ok":"ok"});
      })
      j = 0;
      i = 0;
    })




  });

}
