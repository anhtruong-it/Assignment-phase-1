export class newchannels {
  channelId: number;
  channelName: string;
  user:[
    {
      userId: number,
      userName: string,
      userRole: string,
    },
  ];
  constructor(channelId: number, channelName: string, user:[{
    userId: number,
    userName: string,
    userRole: string,
  }]) {
    this.channelId = channelId;
    this.channelName = channelName;
    this.user = user;
  }
}
