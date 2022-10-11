const { ClassificationType } = require("typescript");

module.exports = {
  connect: function(io, PORT) {


    const chatS = io.of('/super');
    const chatM = io.of('/users');

    chatS.on('connection', (socket) => {
      var rooms=[];
      var socketRoom =[];
      var socketRoomnum=[];
      console.log('user connection on port ' + PORT + ' : ' + socket.id);

      socket.on('message', (message)=>{
        console.log("room, ", socketRoom.length)
        for (i=0; i<socketRoom.length; i++){
          console.log("socketRoom[i][0]: ", socketRoom[i][0], 'socket.id: ', socket.id);
          if(socketRoom[i][0] == socket.id){
            console.log("message: ", message[0], message[1]);
            chatS.to(socketRoom[i][1]).emit('message', message);
           // chat.in(room).emit('notice', " A new user has joined");
          }
        }
      });

      socket.on('newroom', (newroom)=>{

        if(rooms.indexOf(newroom) == -1){
          rooms.push(newroom);
          chat.emit('roomlist', JSON.stringify(rooms));
        }
      });

      socket.on('roomlist', (m)=>{
        rooms = m;
        console.log('m:, ', rooms);
        chatS.emit('roomlist', JSON.stringify(rooms));
      });

      socket.on('numusers', (room)=>{
        var usercount = 0;

        for(i=0;i<socketRoomnum.length;i++){
          if(socketRoomnum[i][0] == room){
            usercount = socketRoomnum[i][1];
          }
        }
        chatS.in(room).emit('numusers', usercount);
      });

       socket.on('joinRoom', (room)=>{

        if(rooms.includes(room) == true){
          console.log('room', room);
          socket.join(room);
            console.log('joined3cs');
            var inroomSocketarray = false;

            for(i=0;i<socketRoom.length;i++){
              console.log(socketRoom[i][0] == socket.id)
              if(socketRoom[i][0] == socket.id){
                socketRoom[i][1] = room;
                inroom = true;
              }
            }
            if(inroomSocketarray == false){
              socketRoom.push([socket.id, room]);

              var hasroomnum = false;

              for(let j=0;j<socketRoomnum.length;j++){
                if(socketRoomnum[j][0] == room){
                  socketRoomnum[j][1] = socketRoomnum[j][1] + 1;
                  hasroomnum = true;
                }
              }
              if(hasroomnum == false){
                socketRoomnum.push([room, 1]);


              }

            }

            chatS.in(room).emit('notice', " A new user has joined");


          return chatS.in(room).emit('joined', room);
        }
      });




    socket.on("leaveRoom", (room)=>{
      for(let i=0;i<socketRoom.length;i++){
        if(socketRoom[i][0] == socket.id){
          socketRoom.splice(i,1);
          socket.leave(room);
          chatS.to(room).emit("notice", "A user has left");
        }
      }

      for(let j=0;j<socketRoomnum.length;j++){
        if(socketRoomnum[j][0] == room){
          socketRoomnum[j][1] = socketRoomnum[j][1]-1;
          if(socketRoomnum[j][1] == 0){
            socketRoomnum.splice(j, 1);
          }
        }
      }
    });

    socket.on('disconnec', ()=>{
      chat.emit("disconnect");
      for(let i=0;i<socketRoom.length;i++){
        if(socketRoom[i][0] == socket.id){
          socketRoom.splice(i,1);
        }
      }
      for(let j=0;j<socketRoomnum.length;j++){
        if(socketRoomnum[j][0] == socket.room){
          socketRoomnum[j][1] = socketRoomnum[j][1]-1;
        }
      }
      console.log("Client disconnected");
    });
  });

  chatM.on('connection', (socket) => {
    var rooms=[];
    var socketRoom =[];
    var socketRoomnum=[];
    console.log('user connection on port ' + PORT + ' : ' + socket.id);

    socket.on('message', (message)=>{
      console.log("room, ", socketRoom.length)
      for (i=0; i<socketRoom.length; i++){
        console.log("socketRoom[i][0]: ", socketRoom[i][0], 'socket.id: ', socket.id);
        if(socketRoom[i][0] == socket.id){
          console.log("message: ", message[0], message[1]);
          chat.to(socketRoom[i][1]).emit('message', message);
         // chat.in(room).emit('notice', " A new user has joined");
        }
      }
    });

    socket.on('newroom', (newroom)=>{

      if(rooms.indexOf(newroom) == -1){
        rooms.push(newroom);
        chatM.emit('roomlist', JSON.stringify(rooms));
      }
    });

    socket.on('roomlist', (m)=>{
      rooms = m;
      console.log('m:, ', rooms);
      chatM.emit('roomlist', JSON.stringify(rooms));
    });

    socket.on('numusers', (room)=>{
      var usercount = 0;

      for(i=0;i<socketRoomnum.length;i++){
        if(socketRoomnum[i][0] == room){
          usercount = socketRoomnum[i][1];
        }
      }
      chatM.in(room).emit('numusers', usercount);
    });

     socket.on('joinRoom', (room)=>{

      if(rooms.includes(room) == true){
        console.log('room', room);
        socket.join(room);
          console.log('joined3cs');
          var inroomSocketarray = false;

          for(i=0;i<socketRoom.length;i++){
            console.log(socketRoom[i][0] == socket.id)
            if(socketRoom[i][0] == socket.id){
              socketRoom[i][1] = room;
              inroom = true;
            }
          }
          if(inroomSocketarray == false){
            socketRoom.push([socket.id, room]);

            var hasroomnum = false;

            for(let j=0;j<socketRoomnum.length;j++){
              if(socketRoomnum[j][0] == room){
                socketRoomnum[j][1] = socketRoomnum[j][1] + 1;
                hasroomnum = true;
              }
            }
            if(hasroomnum == false){
              socketRoomnum.push([room, 1]);


            }

          }

          chatM.in(room).emit('notice', " A new user has joined");


        return chatM.in(room).emit('joined', room);
      }
    });




  socket.on("leaveRoom", (room)=>{
    for(let i=0;i<socketRoom.length;i++){
      if(socketRoom[i][0] == socket.id){
        socketRoom.splice(i,1);
        socket.leave(room);
        chat.to(room).emit("notice", "A user has left");
      }
    }

    for(let j=0;j<socketRoomnum.length;j++){
      if(socketRoomnum[j][0] == room){
        socketRoomnum[j][1] = socketRoomnum[j][1]-1;
        if(socketRoomnum[j][1] == 0){
          socketRoomnum.splice(j, 1);
        }
      }
    }
  });

  socket.on('disconnec', ()=>{
    chat.emit("disconnect");
    for(let i=0;i<socketRoom.length;i++){
      if(socketRoom[i][0] == socket.id){
        socketRoom.splice(i,1);
      }
    }
    for(let j=0;j<socketRoomnum.length;j++){
      if(socketRoomnum[j][0] == socket.room){
        socketRoomnum[j][1] = socketRoomnum[j][1]-1;
      }
    }
    console.log("Client disconnected");
  });
});
}
}

