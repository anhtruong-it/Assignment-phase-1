// User class
/*class User {
  username=String;
  email;
  id=Number;
  role;
  password;



[
  {
    "id": "0",
    "username": "tony",
    "password": "111",
    "email": "tony@com",
    "role": "member"
  },
  {
    "id": "1",
    "username": "tommy",
    "password": "222",
    "email": "tommy@com",
    "role": "member"
  }
]



  constructor(username=String, email, id=Number, role, password=''){
      this.username=username;
      this.email=email;
      this.id=id;
      this.role=role;
      this.password=password;
  }
}*/

/*User (
  [ username='tony', id=1, email='tony@com', password='111', role='member',],
  [ username='tommy', id=2, email='tommy@com', password='222', role='Super Admin',],
);*/

/*var a = {
  User: [{
    username:'tony',
    id:1,
    email:'tony@com',
    password:'111',
    role:'member',
  },
  {
    username:'tommy',
    id:2,
    email:'tommy@com',
    password:'222',
    role:'member',
  }]
}*/
//console.log("user==",a);
var express = require('express');
var app = express();

var cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/../dist/Assignment1'));

var http = require('http').Server(app);
var server = http.listen(3000, function(){
  console.log("Server listening on port: 3000");
});

app.post('/create', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  let uArray = [];
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    uArray = JSON.parse(data);
    console.log("uArray: ", uArray);
    console.log("number element: ", uArray.length);
    let newUser = {
      "id": uArray.length - 1,
      "username": req.body.username,
      "password": req.body.password,
      "email": req.body.email,
      "role": req.body.role
    }

    console.log("newUser: ", newUser);
    uArray.push(newUser);
    console.log(uArray);
    uArrayjson = JSON.stringify(uArray);
    console.log("uArrayjson: ", uArrayjson);
    fs.writeFileSync('./data/users.json', uArrayjson, 'utf8', function(err) {
      if (err) throw err;
      res.send(uArrayjson);
    })
  })
  res.send({"ok":uArrayjson});
});

app.post('/removeUsers', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var u = req.body.username;
  console.log("username: ", u);
  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);

    const i = userArray.findIndex(user =>((user.username == u)));
    console.log("i=", i);
    //console.log(userArray[i]);
      if (i==-1) {
        res.send({"ok": false });
      } else {
        delete userArray[i];

       var cleanArray = [];
       for (var j in userArray) {
        if (userArray[j] == null ) {

        } else {
          cleanArray.push(userArray[j]);
          console.log("clean= ", cleanArray);
        }
       }
       console.log("clean array: ", cleanArray);
        fs.writeFileSync('./data/users.json', JSON.stringify(cleanArray), 'utf-8');
        res.send({"ok": true});
      }
    });
});

app.post('/createGroup', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  let uArray = [];
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    uArray = JSON.parse(data);
    console.log("Group: ", uArray);
    let lastG = uArray.length - 1;
    console.log(uArray[lastG].group);
    let newNameG = uArray[lastG].group + 1;
    let newG = {
      "group": newNameG
    }
    console.log("new group: ", newG);
    uArray.push(newG);
    console.log("new Group Array: ", uArray);
    uArrayjson = JSON.stringify(uArray);
    console.log("uArrayjson: ", uArrayjson);
    fs.writeFileSync('./data/group.json', uArrayjson, 'utf8', function(err) {
      if (err) throw err;
      res.send({"ok":uArrayjson});
    })
  });
  res.send({"ok": true});
});

app.post('/addUser', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group
  console.log("group name= ", g);
  var fs = require('fs');
  let uArray = [];
});

app.post('/createChannel', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group
  console.log("group name= ", g);
  var fs = require('fs');
  let uArray = [];
    fs.readFile('./data/group.json', 'utf8', function(err, data) {
      if (err) throw err;
      const groupArray = JSON.parse(data);
      console.log("new array=", groupArray);
      const i = groupArray.findIndex(group =>((group.group == g)));
      console.log("i=", i);
      console.log("target group: ", groupArray[i]);
     // console.log("channel: ", groupArray[i].channel);

      if (groupArray[i].channel == undefined){
        let newChannel = {
          "nameChannel": 1,
        }
        groupArray[i].channel=[]
        groupArray[i].channel.push(newChannel);
        uArrayjson = JSON.stringify(groupArray);
        console.log("uArrayjson: ", uArrayjson);
        fs.writeFileSync('./data/group.json', uArrayjson, 'utf8', function(err) {
          if (err) throw err;
          res.send({"ok":uArrayjson});
        });
      } else {
        let lastC = groupArray[i].channel.length - 1;
        let newC = groupArray[i].channel[lastC].nameChannel + 1;
        console.log("lastC: ", newC);
        let newChannel = {
          "nameChannel": newC,
        }
        groupArray[i].channel.push(newChannel);
        console.log("new Channel array: ", groupArray[i]);
        uArrayjson = JSON.stringify(groupArray);
        console.log("uArrayjson: ", uArrayjson);
        fs.writeFileSync('./data/group.json', uArrayjson, 'utf8', function(err) {
          if (err) throw err;
          res.send({"ok":uArrayjson});
        });
      }
    })
    res.send({"ok": true});
});

app.post('/showGC', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    const gc = JSON.parse(data);
    res.send({"ok":gc});
  });
});



app.post('/upgradeUsers', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var u = req.body.username;
  var r = req.body.newRole;
  console.log("username: ", u);
  console.log("new role: ", r);


  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);
    console.log("new array=", userArray);

    let json = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    json = json.map(el => {
      if (el.username === u) {
        el.role = r;
      }
      return el;
    });
    fs.writeFileSync('./data/users.json', JSON.stringify(json), 'utf-8');
    res.send({ok:true});
  });

});

app.post('/getUsers', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);
    //console.log("new array=", userArray);
    res.send({"ok": userArray});
  })
});

app.post('/logout', function(req, res) {
  res.send({ok:true});
});

app.post('/login', function(req, res){
  if (!req.body) {
      return res.sendStatus(400)
  }
  var u = req.body.username;
  var p = req.body.password;
  var fs = require('fs');
  fs.readFile('./data/users.json', 'utf8', function(err, data) {
    if (err) throw err;
    const userArray = JSON.parse(data);

    const i = userArray.findIndex(user =>((user.username == u) && (user.password == p)));
    console.log("i=", i);
    //console.log(userArray[i]);
      if (i==-1) {
        res.send({"ok": false });
      } else {
        console.log("get user:", userArray[i]);
        console.log("get role:", userArray[i].role);
        //sessionStorage.setItem('role', userArray[i].role);
        res.send({"ok": userArray[i].role});
      }
  })
});

app.post('/delGroup', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group;
  console.log("group: ", g);
  var fs = require('fs');
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    const groupArray = JSON.parse(data);

    const i = groupArray.findIndex(group =>((group.group == g)));
    console.log("i=", i);
    console.log(groupArray[i]);
      if (i==-1) {
        res.send({"ok": false });
      } else {
        delete groupArray[i];
        console.log(groupArray);
       var cleanArray = [];
       for (var j in groupArray) {
        if (groupArray[j] == null ) {
        } else {
          cleanArray.push(groupArray[j]);
          console.log("clean= ", cleanArray);
        }
       }
       console.log("clean array: ", cleanArray);
        fs.writeFileSync('./data/group.json', JSON.stringify(cleanArray), 'utf-8');
        res.send({"ok": true});
      }
    });
});

app.post('/delChannel', function(req, res) {
  if (!req.body) {
    return res.sendStatus(400)
  }
  var g = req.body.group;
  var c = req.body.channel;
  console.log("group: ", g);
  console.log("channel: ", c);
  var fs = require('fs');
  fs.readFile('./data/group.json', 'utf8', function(err, data) {
    if (err) throw err;
    const groupArray = JSON.parse(data);

    const i = groupArray.findIndex(group =>((group.group == g)));
    console.log("i=", i);
    console.log(groupArray[i]);

      if (i==-1) {
        res.send({"ok": false });
      } else {
        const k = groupArray[i].channel.findIndex(channel =>((channel.nameChannel == c)));
        console.log("k: ", k);
        console.log("channel: ", groupArray[i].channel[k])
        delete groupArray[i].channel[k];
        console.log(groupArray[i]);
        console.log(groupArray);
        var cleanArray = [];

          for (var h in groupArray[i].channel) {
            console.log("c: ", groupArray[i].channel[h]);
            if (groupArray[i].channel[h] == null){

            } else {
              cleanArray.push(groupArray[i].channel[h]);
            }
          }
          groupArray[i].channel = cleanArray;


        console.log("channel: ", groupArray);

        fs.writeFileSync('./data/group.json', JSON.stringify(groupArray), 'utf-8');
      }
    });
    res.send({"ok": true});
});

