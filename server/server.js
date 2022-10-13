const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;
const PORT = 3000;
const server = require('./listen.js');
app.use(cors());
app.use(bodyParser.json());
const url = 'mongodb://localhost:27017';
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  }
});
const sockets = require('./socket.js');

const groupArray = [
  {
    groupId: 1,
    groupName: "group 1",
    channel: [
      {
        channelName: "channel 1",
        user: [
          {
            user_id: "",
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  },
  {
    groupId: 2,
    groupName: "group 2",
    channel: [
      {
        channelName: "channel 2",
        user: [
          {
            user_id: "",
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  }
]


const channelArray = [
  {
    channelId: 1,
    channelName: "channel 01",
    groupID: 1,

  },
  {
    channelId: 3,
    channelName: "channel 03",
    groupID: 2,
  },
  {
    channelId: 4,
    channelName: "channel 04",
    groupID: 1,
  },
  {
    channelId: 5,
    channelName: "channel 05",
    groupID: 1,
  },
  {
    channelId: 6,
    channelName: "channel 06",
    groupID: 1,
  }
]


const userArray = [
  {
    userId: 1,
    userName: 'a',
    userPwd: '1',
    userRole: 'Super Admin',
    groupId:[]
  },
  {
    userId: 2,
    userName: 'b',
    userPwd: '2',
    userRole: 'Group Admin',
    groupId:[]
  },
  {
    userId: 3,
    userName: 'c',
    userPwd: '3',
    userRole: 'Group Assis',
    groupId:[]
  },
  {
    userId: 4,
    userName: 'd',
    userPwd: '4',
    userRole: 'member',
    groupId:[]
  },
  {
    userId: 5,
    userName: 'e',
    userPwd: '5',
    userRole: 'member',
    groupId:[
      {
        id: 1,
        channelId: 1,
      }
    ]
  },
  {
    userId: 6,
    userName: 'h',
    userPwd: '6',
    userRole: 'member',
    groupId:[
      {
        id: 1,
        channelId: 4,
      },
      {
        id: 1,
        channelId: 6,
      },
    ]
  },
  {
    userId: 7,
    userName: 'g',
    userPwd: '7',
    userRole: 'member',
    groupId:[
      {
        id: 1,
        channelId: 1,
      },
      {
        id: 2,
        channelId: 3,
      },
    ]
  }

]



const GCUArray = [
  {
    groupId: 1,
    groupName: "group 1",
    channel: [
      {
        channelId: 1,
        channelName: "channel 01",
        user: [
          {
            userId: 5,
            userName: "e",
            userRole: "member",
          },
          {
            userId: 7,
            userName: "g",
            userRole: "member",
          }
        ]
      },
      {
        channelId: 4,
        channelName: "channel 04",
        user: [
          {
            userId: 6,
            userName: "h",
            userRole: "member",
          }
        ]
      },
      {
        channelId: 5,
        channelName: "channel 05",
        user: [

        ]
      },
      {
        channelId: 6,
        channelName: "channel 06",
        user: [
          {
            userId: 6,
            userName: "h",
            userRole: "member",
          }
        ]
      },
    ]
  },
  {
    groupId: 2,
    groupName: "group 2",
    channel: [
      {
        channelId: 3,
        channelName: "channel 03",
        user: [
          {
            userId: 7,
            userName: "g",
            userRole: "member",
          }
        ]
      },
    ]
  }
]


const callbackUserHell = async function(client, myColU) {
  result = await myColU.insertMany(userArray);
}

const callbackGroupHell = async function(client, myCol) {
  result = await myCol.insertMany(groupArray);
 // console.log("Inserted");
 // console.log(docArray);
};

const callbackChannelHell = async function(client, myColC) {
  result = await myColC.insertMany(channelArray);
  //console.log("channel: ", result);
}

const callbackGCUHell = async function(client, myColGCU) {
  result = await myColGCU.insertMany(GCUArray);
  //console.log("channel: ", result);
}



MongoClient.connect(url, {maxPoolSize: 10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  if (err) { return console.log(err)}
    const dbName = 'database';
    const db = client.db(dbName);
    db.dropDatabase();

    const dbG = client.db(dbName);

    const myCol = dbG.collection('groups');
    callbackGroupHell(client, myCol);

    const myColC = dbG.collection('channels');
    callbackChannelHell(client, myColC);

    const myColU = dbG.collection('users');
    callbackUserHell(client, myColU);

    const myColGCU = dbG.collection('GCUs');
    callbackGCUHell(client, myColGCU);

    const collect = dbG.listCollections().forEach(function(err, coll) {
     // console.log("cllect", coll);
    });


    require('./routes/api-getlist')(dbG, app);

    require('./routes/api-getGCU')(dbG, app);
    require('./routes/api-getChannels')(dbG, app);
    require('./routes/api-getChannelDel')(dbG, app);
    require('./routes/api-createUser')(dbG, app);
    require('./routes/api-addChannel')(dbG, app, ObjectID);
    require('./routes/api-addGroup')(dbG, app, ObjectID);
    require('./routes/api-testChannel')(dbG, app);
    require('./routes/api-deleteGroup')(dbG, app, ObjectID);
    require('./routes/api-deleteChannel')(dbG, app, ObjectID);
    require('./routes/api-getUser')(dbG, app);
    require('./routes/api-deleteUser')(dbG, app, ObjectID);
    require('./routes/api-updateUser')(dbG, app, ObjectID);
    require('./routes/api-login')(dbG, app, ObjectID);
    require('./routes/api-addUsertoGroupChannnel')(dbG, app, ObjectID);
    require('./routes/api-removeUser')(dbG, app, ObjectID);
    require('./routes/api-updateChannelUser')(dbG, app, ObjectID);
    require('./routes/api-getChannelforUser')(dbG, app);





    sockets.connect(io, PORT);

    server.listen(http, PORT);


})



