const { DBRef } = require("mongodb");

module.exports = function(dbG, app) {

  app.post('/api/createUser', function(req, res) {

    if (!req.body) { return req.send(400); }

    users = req.body;
    console.log(users.userId, users.userName);
    const collection = dbG.collection('users');

    collection.find({'userId': users.userId}).count((err, count)=> {
      if (count == 0) {

        collection.insertOne(users, (err, dbres)=> {
          if (err) throw err;
          let num = dbres.insertedCount

          res.send({'num': num, err: null});
        });
      } else {
        res.send({num: 0, err: "duplicate item"});
      }
    });
  });
}
