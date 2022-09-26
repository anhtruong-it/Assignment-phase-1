import { UntypedFormBuilder } from "@angular/forms";

export class user {
  _id = UntypedFormBuilder;
  userId: number;
  userName: string;
  userPwd: string;
  userRole: string;

  constructor(userId: number, userName: string, userPwd: string, userRole: string) {
    this.userId = userId;
    this.userName = userName;
    this.userPwd = userPwd;
    this.userRole = userRole;
  }
}
