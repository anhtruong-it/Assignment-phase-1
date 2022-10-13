
const { DBRef } = require("mongodb");
const { async } = require("rxjs");
const { resolveModuleName } = require("typescript");

module.exports = function(dbG, app, ObjectID) {

  app.post('/api/addGroup', async function(req, res) {
    console.log("add group!");
    if (!req.body) { return res.sendStatus(400);}

    group = req.body;
    const collection = dbG.collection('GCUs');

    collection.find({'groupId':group.groupId}).count((err, count)=>{
      if (count == 0) {
        collection.insertOne(group, (err, dbres)=>{
          if (err) throw err;
          let num = dbres.insertedCount;

          console.log("group added");
          res.send({"ok":"ok"});
        })
      } else {
        console.log("duplicate group");
        res.send({"ok":"no"});
      }
    })
  })
}
