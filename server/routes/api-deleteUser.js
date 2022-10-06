module.exports = function(dbG, app, ObjectID) {

  app.post('/api/deleteUser', function(req, res) {
    console.log("ok");
    //alert("ok");
    if (!req.body) { return res.sendStatus(400);}
    userId = req.body.userId;
    console.log("userId", userId);


    var objectid = new ObjectID(userId);
    const collection = dbG.collection('users');

    collection.deleteOne({_id: objectid}, (err, docs)=> {

      collection.find({}).toArray((err, data)=> {
        console.log("data after: ", data);
        res.send({"ok":"ok"});
      });
    });
  });
}
