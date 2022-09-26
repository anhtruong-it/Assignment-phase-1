const { async } = require("rxjs");

module.exports = function(dbG, app) {

  app.get('/api/getlist',  function(req, res) {


    const collectionG = dbG.collection('groups');
    collectionG.find({}).toArray((err, dataG)=> {

      console.log("groups: ", dataG);
     // datas.push(dataG);
      const collectionC = dbG.collection('channels');
        collectionC.find({}).toArray((err, dataC)=> {
          console.log("channels: ", dataC);
        //  datas.push(dataC);
          const collectionU = dbG.collection('users');
        collectionU.find({}).toArray((err, dataU)=> {
          console.log("users: ", dataU);
        // datas.push(dataU);
        //console.log('datas: ', [dataG,dataC,dataU]);
        res.send({'ok':[dataG,dataC,dataU]});
        });
        });

    });


    //console.log('datas: ',  datas);

  });

}
