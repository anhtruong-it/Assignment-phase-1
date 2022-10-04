const { async } = require("rxjs");


module.exports = function(dbG, app) {

  app.get('/api/getGCU', async function(req, res) {

    Gid = [];
    Cid = [];
    Uid = [];

    //const collectionG = dbG.collection('groups');
    const collectionC = dbG.collection('channels');
    const collectionU = dbG.collection('users');
    const collection = dbG.collection('GCUs');
    /*
    const G = await collectionG.find({}).toArray();
    console.log(G);
    G.forEach(id => {
      Gid.push(id._id);
    })
    */


    const U = await collectionU.find({}).toArray();
    //console.log(U);
    U.forEach(id => {
      Uid.push(id._id);
    })

    const C = await collectionC.find({}).toArray();
   // console.log(C);
    C.forEach(id => {
      Cid.push(id._id);
    })


    const GCU = await collection.find({}).toArray();
    //console.log("Gid: ", Gid);
    //console.log("Cid: ", Cid);
    //console.log("Uid: ", Uid);
   // console.log("GCU: ", GCU);
    GCU.forEach(channel => {
     // console.log("GCU: ", channel)
    })


   const GCUs = dbG.collection('GCUs');
   GCUs.find({}).toArray((err, data)=> {

    console.log("GCUS: ", data);
    data.forEach(c=>{console.log("channel: ", c.channel);})
    console.log("---------------")



    res.send({"ok":data});
   });






    //collection


/*
    const collection = dbG.collection('GCUs');
    collection.find({}).toArray((err, data)=> {
      //console.log("GCU: ", data);

      data.forEach(group =>{
        console.log('group: ', group.groupID);
        //console.log(group.channel);

        group.channel.forEach(channel =>{
          console.log('channel: ',channel.channelId);

          channel.user.forEach(user => {
            console.log('user: ', user.userId);
          })
        });

      });

      res.send({'ok':data});
    });*/
  });
}
