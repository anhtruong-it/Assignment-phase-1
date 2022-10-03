import { UntypedFormBuilder } from "@angular/forms";

export class channel {
  _id = UntypedFormBuilder;
  channelId: number;
  channelName: string;
  groupID: any;

  constructor(channelId: number, channelName: string, groupID: any) {
    this.channelId = channelId;
    this.channelName = channelName;
    this.groupID = groupID;
  }

}
