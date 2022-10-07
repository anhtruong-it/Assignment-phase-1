
const { DBRef } = require("mongodb");
const { async } = require("rxjs");
const { resolveModuleName } = require("typescript");

module.exports = function(dbG, app, ObjectID) {

  app.post('/api/addUserGC', async function(req, res) {
    console.log("add UserGC!");
    if (!req.body) { return res.sendStatus(400);}

    userId = req.body.userId;
    groupId = req.body.groupId;
    channelId = req.body.channelId;
    console.log("UGC: ", userId, groupId, channelId);

    const collectionU = dbG.collection("users");
    collectionU.find({userId: Number(userId)}).toArray((err, data)=>{
      console.log("userRole:", data[0].userRole);
      if (data[0].userRole == 'Super Admin') {
         res.send({"ok":"error Super Admin"});
        } else if (data[0].userRole == 'Group Admin') {
          res.send({"ok":"error Group Admin"});
        } else {
          console.log(data[0].goupId);
          for(let id of data[0].goupId) {
            console.log("id: ", id);
            if (id.channelId == channelId) {
              res.send({"ok":"user already in this channel!"})
              break;

            }
          }
        }
    })

  })
}
