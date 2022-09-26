import { UntypedFormBuilder } from "@angular/forms";

export class channel {
  _id = UntypedFormBuilder;
  channelId: number;
  channelName: string;

  constructor(channelId: number, channelName: string) {
    this.channelId = channelId;
    this.channelName = channelName;
  }
}
