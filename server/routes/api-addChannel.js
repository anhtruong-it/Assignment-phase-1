const { DBRef } = require("mongodb");
const { async } = require("rxjs");
const { resolveModuleName } = require("typescript");

module.exports = function(dbG, app, ObjectID) {

  app.post('/api/addChannel', async function(req, res) {
    console.log("add channel!");
    if(!req.body) {return res.sendStatus(400);}
    newC = req.body;
    console.log(newC.groupID);
    const channel = await dbG.collection('channels');
    channel.find({'channelId': newC.channelId}).count((err, count)=> {
      if(count == 0) {
        channel.insertOne(newC, (err, dbres)=> {
          if(err) throw err;
          let num = dbres.insertedCount;
          console.log("added channel class");
        })
        const GCUs = dbG.collection('GCUs');
        var newA = [];
        var groupName='';
        var dict = {
          channelId: newC.channelId,
          channelName: newC.channelName,
          user: [

          ]
        }
        GCUs.find({"groupId":newC.groupID}).toArray((err, data)=> {
         data.forEach(c => {
          newA.push(c.channel);
          groupName = c.groupName
         })
         newA[0].push(dict);
         newA[0].sort((a, b)=> a.channelId - b.channelId);
         console.log("newA: ", newA[0]);
         GCUs.updateOne({"groupId":newC.groupID, "groupName": groupName}, {$set:{"channel":newA[0]}}, ()=>{
          //console.log(data);
          GCUs.find({}).toArray((err, datas)=>{
            res.send({'ok':"ok"});
          })
        });
      });
      } else {
        console.log("duplicate item");
        res.send({"ok":err});
      }
    })
})
}
