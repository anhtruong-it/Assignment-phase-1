module.exports = function(dbG, app, ObjectID) {

  app.post('/api/deleteChannel', function(req, res) {

    if(!req.body) { return res.sendStatus(400);}
    groupId = Number(req.body.groupId);
    channelId = Number(req.body.channelId);
    console.log("groupId: ", groupId);
    console.log("channelId: ", channelId);

    const collection = dbG.collection("GCUs");
    const ch = dbG.collection('channels');
    ch.deleteOne({channelId: Number(channelId)}, (err, data0)=>{

      collection.find({groupId: groupId}).toArray((err, data) => {
        if (err) throw err;
        console.log("GCUs: ", data);
        var i = 0;
        for(let c of data[0].channel) {
          if (c.channelId == channelId) {
            console.log('i: ', i);
            break;
          } else  {
            i += 1;
          }
        }
        data[0].channel.splice(i,1);
        collection.deleteOne({groupId: groupId}, (err, docs)=> {
          collection.find({}).toArray((err, datas)=>{
            console.log("datas: ", datas);
            collection.find({'groupId': groupId}).count((err, count) => {
              if (count == 0) {
                console.log("ok");
                collection.insertOne(data[0], (err) => {
                  if (err) throw err;
                  collection.find({}).toArray((err, datass)=>{
                    if (err) throw err;
                    console.log("datass: ", datass);
                    res.send({"ok":"ok"});
                  })
                })
              } else {
                console.log("no");
              }
            })
          })
        })
      })
    })
  });

}
