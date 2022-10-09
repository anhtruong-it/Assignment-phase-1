
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
     // console.log("userRole:", data[0].userRole);
      if (data[0].userRole == 'Super Admin') {
         res.send({"ok":"error Super Admin"});
        } else if (data[0].userRole == 'Group Admin') {
          res.send({"ok":"error Group Admin"});
        } else {
          var j = 0;
          console.log("already in: ", data[0].groupId);
          for(let id of data[0].groupId) {

            if (id.channelId == channelId) {
              console.log("duplicate G/C", id);
              j += 1;
              //res.send({"ok":"user already in this channel!"})
              break;
            }
          }
          console.log("j = ", j);
          if (j > 0) {

            res.send({"ok":"user already in this channel!"});
          } else {
            console.log('G/C target: Group= ', groupId, ' Channel= ', channelId);
            const u = dbG.collection('users');
            var newA = [];
            var userName = '';
            var userPwd = '';
            var userRole = '';
            var dict = {
              id: groupId,
              channelId: channelId,
            }

            u.find({"userId": Math.floor(userId)}).toArray((err, data2)=> {
              console.log('data2: ', data2);
              userName = data2[0].userName;
              userRole = data2[0].userRole;
              userPwd = data2[0].userPwd;
              data2[0].groupId.forEach(id=>{
                console.log(id);
                //console.log(id.id, id.channelId);
                if (id.id != null && id.channelId != null){
                  newA.push(id)

                }
              })
              //console.log("newA: ", newA);
              newA.push(dict);
              console.log(userId, userName, userPwd, userRole)
              console.log("newA: ", newA);
              const u2 = dbG.collection("users");
              u.deleteOne({userId:Number(userId)}, ()=>{
                u.insertOne({userId: Number(userId), userName: userName, userPwd: userPwd, userRole: userRole, groupId: newA}, ()=>{
                  var newB = [];
                  var newC = [];
                  var groupName='';
                  var channelName='';

                  const channel = dbG.collection('channels');
                  channel.find({channelId}).toArray((err, data4)=>{
                   // channelName = data4[0];
                    //console.log("channelName: ", channelName);
                    const GCUs = dbG.collection('GCUs');
                    GCUs.find({groupId: groupId}).toArray((err, data5)=>{
                      groupName = data5[0].groupName;
                      console.log('GCUs: ', data5[0].channel);
                      data5[0].channel.forEach(d=>{
                        if (d.channelId == channelId) {
                          newB.push(d);
                        } else {
                          newC.push(d);
                        }
                      })
                      //console.log('newB1: ', newB);
                      //console.log('newC1: ', newC);
                      var dict2 = {
                        userId: Number(userId),
                        userName: userName,
                        userRole: userRole
                      }
                     // console.log(dict2);
                      newB[0].user.push(dict2);
                      //console.log(newB[0].user);
                      //console.log(newB[0]);
                      newC.push(newB[0]);
                      newC.sort((a, b)=> a.channelId - b.channelId);
                      console.log(newC);
                      GCUs.deleteOne({groupId: groupId}, (err, data)=>{
                        GCUs.insertOne({groupId: Number(groupId), groupName: groupName, channel: newC}, ()=>{
                          res.send({"ok":"ok"});
                        })
                      })
                    })
                  })
                })
              })
            })
          }
        }
    })
  })
}
