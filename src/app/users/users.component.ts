import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommunicateService } from '../services/communicate.service';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';
import { GCU } from '../database/G-C-U';
import { newchannels } from '../database/channels';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'applicaiton/json'})
};

// for Angular http methods
import { Router } from '@angular/router';
import { splitNsName } from '@angular/compiler';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userId: number;
  userName: string;
  userRole: string;
  isChannelList = false;
  newChannel: any;
  channel: string='';



  userstore: string;

  private socket;
  messagecontent:string="";
  messages:string[] = [];
  rooms=[];
  roomslist:string="";
  roomnotice:string="";
  currentroom:string="";
  isinRoom= false;
  newroom:string="";
  numusers:number=0;
  channels:[];
  usernamechat:string='';


  ioConnection:any;
  joinU = false;
  open=false;

  constructor(private router:Router, private httpClient: HttpClient, private proddata: CommunicateService) { }

  ngOnInit(): void {
    this.userstore = sessionStorage.getItem('userName');
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.userId!=null){
      //this.getChannelforUser();
    }
  }

  openChannels(userId){
    this.proddata.getChannelforUser(Number(userId)).subscribe((data)=>{
      this.newChannel = data.ok;
      this.isChannelList = true;
    })
  }

  getChannelforUser(){


  }

  userJoin(userId) {
    this.proddata.getChannelforUser(Number(userId)).subscribe((data)=>{
      this.newChannel = data.ok;
      this.isChannelList = true;
      this.proddata.initSocket(sessionStorage.getItem('userRole'));
    this.proddata.getMessage((m)=>{
      this.usernamechat = m[1];
      this.messages.push(m)
    });
    this.proddata.reqroomList(this.newChannel);
    this.proddata.getroomList((msg)=>{ this.rooms = JSON.parse(msg)});
    this.proddata.notice((msg)=>{ this.roomnotice = msg});
    this.proddata.joined((msg)=>{ this.currentroom = msg
      if(this.currentroom != ""){
        this.isinRoom = true;
      }else{
        this.isinRoom = false;
      }
    }
  );
    });
}

  joinroom(){
    //alert(this.channel);
    this.proddata.joinroom(this.channel);
    this.proddata.reqnumusers(this.channel);
    this.proddata.getnumusers((res)=>{this.numusers = res});
  }

  clearnotice() {
    this.roomnotice = "";
  }

  leaveroom() {
    this.proddata.leaveroom(this.currentroom);
    this.proddata.reqnumusers(this.currentroom);
    this.proddata.getnumusers((res)=>{ this.numusers = res});
    this.channel = null;
    this.currentroom ="";
    this.isinRoom = false;
    this.numusers = 0;
    this.roomnotice ="";
    this.messages = [];
  }

  createroom() {
   // this.proddata.createroom(this.newroom);
   // this.proddata.reqroomList();
  //  this.newroom ="";
  }

  chat(messagecontent){
    if(messagecontent){
      this.messagecontent = messagecontent;
      this.proddata.sendMessage([this.messagecontent, this.userstore]);
      this.messagecontent=null;

    }else {
      console.log("no message");
    }

  }


}
