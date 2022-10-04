 class newchannels {
  channelId='';
  channelName='';
  user:[
    {
      userId,
      userName,
      userRole,
    },
  ];
  constructor(channelId='', channelName='', user:[{
    userId,
    userName,
    userRole,
  }]) {
    this.channelId = channelId;
    this.channelName = channelName;
    this.user = user;
  }
}
