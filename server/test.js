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
            userId: "",
            userName: "",
            userRole: "",
          },
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
      {
        channelId: 4,
        channelName: "channel 04",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
      {
        channelId: 7,
        channelName: "channel 04",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
      {
        channelId: 5,
        channelName: "channel 04",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
      {
        channelId: 6,
        channelName: "channel 04",
        user: [
          {
            userId: "",
            userName: "",
            userRole: "",
          }
        ]
      },
    ]
  }
]


//console.log("test: ",delete GCUArray[0].channel[0]);
//console.log("test: ",GCUArray[0].channel.slice());
console.log("channel: ",GCUArray[0].channel );
var i = 0;
for(let c of GCUArray[0].channel){
  console.log("c: ", c);
  console.log("channelId: ", c.channelId);
  if (c.channelId == 6) {
    console.log('i: ', i);
    break;
  } else  {
    i += 1;
  }
}
console.log('i2: ', i);
//delete GCUArray[0].channel[i];

console.log("channel: ",GCUArray[0].channel.splice(i,1) );
console.log("channel: ",GCUArray[0].channel );

let games = [
  { name: 'Mashraki',          rating: 4.21 },
  { name: 'Hill Climb Racing', rating: 3.88 },
  { name: 'Angry Birds Space', rating: 3.88 },
  { name: 'Badland',           rating: 4.33 }
];

// sort by one attribute
console.log(sortByAttribute(games, 'name'));
