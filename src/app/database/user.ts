import { UntypedFormBuilder } from "@angular/forms";

export class user {
  _id = UntypedFormBuilder;
  userId: number;
  userName: string;
  userPwd: string;
  userRole: string;
  groupId:[
    {
      id: number;
      channelId: number;
    }
  ];


  constructor(userId: number, userName: string, userPwd: string, userRole: string, groupId:[{id: number, channelId: number}]) {
    this.userId = userId;
    this.userName = userName;
    this.userPwd = userPwd;
    this.userRole = userRole;
    this.groupId = groupId
  }
}
