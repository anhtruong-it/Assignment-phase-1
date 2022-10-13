import { UntypedFormBuilder } from "@angular/forms";

export class GCU {
  _id = UntypedFormBuilder;
  groupId: number;
  groupName: string;
  channel: [
    {
      channelId: number,
      channelName: string,
      user:[
        {
          userId: number,
          userName: string,
          userRole: string,
        },
      ];
    } ,
  ];

  constructor(groupId: number, groupName: string, channel:[
    {
      channelId: number,
      channelName: string,
      user:[
        {
          userId: number,
          userName: string,
          userRole: string,
        },
      ];
    } ,
  ]){
    this.groupId = groupId;
    this.groupName = groupName;
    this.channel = channel;

  }
}
