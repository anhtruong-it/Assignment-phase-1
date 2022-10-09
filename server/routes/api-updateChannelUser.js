
module.exports = function(dbG, app, ObjectID) {

  app.post('/api/updateChannelUser', function(req, res) {

    if(!req.body) { return res.sendStatus(400);}
    userId = req.body.userId;
    groupId = req.body.groupId;
    channelId = req.body.channelId;
    console.log("userId: ", userId);
    console.log("groupId: ", groupId);
    console.log("channelId: ", channelId);
    const collection = dbG.collection('users');
    collection.find({userId: Number(userId)}).toArray((err, data)=>{
      if (err) throw err;
      var i = 0;
      for(let g of data[0].groupId) {
        if ((groupId == g.id) && (channelId == g.channelId)) {
          console.log('i: ', i);
          break;
        } else  {
          i += 1;
        }
      }
      data[0].groupId.splice(i,1);
      collection.deleteOne({userId: userId}, (err, doc)=>{
        collection.find({userId: userId}).count((err, count)=>{
          if (count == 0) {
            collection.insertOne(data[0], (err)=>{
              if (err) throw err;
              res.send({"ok":"ok"});
            })
          }
        })
      })
    })
  });

}
