module.exports = function(dbG, app, ObjectID) {

  app.post('/api/deleteUser', function(req, res) {
    console.log("ok");
    //alert("ok");
    if (!req.body) { return res.sendStatus(400);}
    userId = req.body.userId;
    console.log("userId", userId);
    var id = Number;
    var group = [];


    //var objectid = new ObjectID(userId);
    const collection = dbG.collection('users');
    collection.find({userId: userId}).toArray((err, data)=>{
   //   console.log('user: ', data);
      id = data[0].userId;
     // console.log('userId: ', id);
      data[0].groupId.forEach(g=>{
     //   console.log("group/channel: ", g);
        group.push(g);
      })
      console.log("id: ", id, " group: ", group);
      collection.deleteOne({userId: id}, (err, docs)=> {
        collection.find({}).toArray((err, data)=> {
         // console.log("data after: ", data);
        //  console.log([id, group]);
        if (group.length == 0) {
          console.log([id, group, false]);
          res.send({"ok":[id, group, false]});
        } else {
          console.log([id, group, true]);
          res.send({"ok":[id, group, true]});
        }

        });
      });
    })



    /*
    collection.deleteOne({_id: objectid}, (err, docs)=> {

      collection.find({}).toArray((err, data)=> {
        console.log("data after: ", data);
        res.send({"ok":"ok"});
      });
    });
    */
  });
}
