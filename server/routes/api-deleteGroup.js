module.exports = function(dbG, app, ObjectID) {

  app.post('/api/deleteGroup', function(req, res) {

    if(!req.body) { return res.sendStatus(400);}
    groupId = req.body.groupId;
    console.log("group._Id: ", groupId);

    //var objectid = new ObjectID(groupId);
    //console.log("groupId: ", objectid);
    const collection = dbG.collection("GCUs");

    collection.deleteOne({groupId: groupId}, (err, docs)=>{
      collection.find({}).toArray((err, data)=>{
        if (err) throw err;
        console.log("GCU after: ", data);
        const collectionC = dbG.collection("channels");
        collectionC.deleteMany({groupID: groupId}, (err, docss)=> {
          if (err) throw err;
          res.send({"ok":"ok"});
        })

        //res.send(data);
      });
    });
  });
}
