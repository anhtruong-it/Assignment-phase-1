import { UntypedFormBuilder } from "@angular/forms";

export class group {
  _id = UntypedFormBuilder;
  groupId: number;
  groupName: string;

  constructor(groupId: number, groupName: string) {
    this.groupId = groupId;
    this.groupName = groupName;
  }
}
