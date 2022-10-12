const { async } = require("rxjs");


module.exports = function(dbG, app) {

  app.get('/api/getGCU', async function(req, res) {


    gAndC = []
    g_c_u = [];

   const GCUs = dbG.collection('GCUs');
   GCUs.find({}).sort({groupId:1}).toArray((err, data)=> {
    data.forEach(g=>{
      g.channel.forEach(c=>{
        gAndC.push([g.groupId, c.channelId, g.groupName, c.channelName])
        c.user.forEach(u=>{
          g_c_u.push([u.userId, g.groupId, c.channelId, u.userName, c.channelName])
        })
      })
    })
    res.send({"ok":[data, gAndC, g_c_u]});
   });
  });
}
