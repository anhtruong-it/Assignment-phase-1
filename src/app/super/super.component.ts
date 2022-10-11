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

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {


  // get list of groups/channels/users
  isGroupOpen = false;
  gcu: GCU[] = [];
  channels:[];
  userss: user[] = [];

  // get list of users
  isUserOpen = false;
  user: user[] = [];

  // add new group
  isGroupForm = false;

  //add new channel
  isChannelOpen = false;
  channelId: number;
  channelName: string;
  newChannel : channel;

  // add user to group/channel
  isUserForm = false;

  // update user
  isUserUpdate = false;

  // create new user
  isUserCreate = false;
  newUser: user;
  userId: number = null;
  userName: string = '';
  userPwd: string = '';
  userRole: string = '';
  group_Id: any[] = [
    {id: Number,
    channelId: Number,}
  ];

  // join to chat
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
  userstore:string='';


  ioConnection:any;

  userIds: number;
  user_Ids: number;






  //newChannels: newchannels;
 // testChannels: channel[] = [];
  groupId: number;
  groupName: string;
  newGroup: GCU;

  user_Id: number;
  user_Name: string;
  user_Pwd: string;
  user_Role: string;

  userNameLogin: string;
  PwdLogin: string;
  group: group[] = [];
  channel: channel[] = [];
  userobjid: string = '';
  usernamechat:string='';
  constructor(private router:Router, private httpClient: HttpClient, private proddata: CommunicateService) { }

  ngOnInit(): void {

    this.userstore = sessionStorage.getItem('userName');
    this.userJoin();
  }

  // get list of groups/channels/users
  GCU() {
    this.proddata.getGCU().subscribe((data)=> {
      this.gcu = data.ok;
      this.proddata.getChannels().subscribe((data1)=>{
        this.channels = data1.ok;
        this.proddata.getUser().subscribe((data)=> {
          this.user = data.ok;
          this.userss = data.ok;
          this.isGroupOpen = true;
        })
      })
    })
  }

  // close list of groups/channels/users
  closeGCU(){
    this.isGroupOpen = false;
  }

  // get list of users
  getUser() {
    this.proddata.getUser().subscribe((data)=> {
      this.user = data.ok;
      this.isUserOpen = true;
      return this.user;
    })
  }

    // close list of groups/channels/users
    closeUser(){
      this.isUserOpen = false;
    }

    // add new group
    openFormG() {
      this.isGroupForm = true;
    }

    closeFormG() {
      this.isGroupForm = false;
    }

    addGroup(group_id, groupName) {
      this.newGroup = new GCU(group_id, groupName, [{channelId:null, channelName:'',user:[{userId:null,userName:'',userRole:''}]}]);
      this.proddata.addGroup(this.newGroup).subscribe((data)=>{
          if (data.ok == 'ok') {
            this.GCU();
          } else {
            alert("duplicate group");
          }
      })
    }

    // delete group
    deleteGroup(groupId){
      if (confirm("Are you sure you want to delete this group")) {
        this.proddata.deleteGroup(groupId).subscribe((data)=> {
          if(data) {
            this.GCU();
          }
        });
      }
    }

    // add new channel
    openForm() {
      this.isChannelOpen = true;
    }

    closeForm() {
      this.isChannelOpen = false;
    }

    addChannel(groupd_id, channelId, channelName) {
      this.channelId = channelId;
      this.channelName = channelName;
      this.newChannel = new channel(this.channelId, this.channelName,groupd_id);
      this.proddata.addChannel(this.newChannel).subscribe((data)=> {
        if (data.ok=="ok") {
          alert("added");
          this.GCU();
          this.userJoin();
          this.channelId=null;
          this.channelName="";
        } else {
          alert("false");
          this.GCU();
        }
      });
    }

    // delete channel
    deleteChannel(groupId, channelId){
      if (confirm("Are you sure you want to delete this channel")) {
        this.proddata.deleteChannel(groupId, channelId).subscribe((data)=> {
          if(data.ok == "ok") {
            alert("channel removed");
            this.GCU();
            this.userJoin();
          }
        });
      }
    }

    // remove user
    removeUser(userId, groupId, channelId) {
      this.proddata.removeUser(userId, groupId, channelId).subscribe((data)=>{
        if (data.ok=='ok'){
          alert("user removed");
          this.proddata.updateChannelUser(userId, groupId, channelId).subscribe((data1)=>{
            if (data1.ok == "ok") {
              this.getUser();
            }
          })
          this.GCU();
        }
      })
    }

    // add user to group/channel
    openFormUGC() {
      this.isUserForm = true;
    }

    closeFormUGC() {
      this.isUserForm = false;
    }

    addUserGC(userId, groupId, channelId) {
      this.proddata.addUserGC(userId.toString(), groupId, channelId).subscribe((data)=>{
        if (data.ok == "ok"){
          alert("user added");
          this.GCU();
          this.getUser();
        } else {
          alert(data.ok);
        }
      })
    }

    // delete user
    deleteUser(userId) {
      this.proddata.deleteUser(userId).subscribe((data)=>{
        if (data.ok != false){
          if (data.ok[1].length > 0){
            for(let g of data.ok[1]){
              alert("enter to remove this user from Channel!");
              this.proddata.removeUser(data.ok[0], g.id, g.channelId).subscribe((data1)=>{
                if (data1.ok=='ok'){
                  alert("user removed");
                  this.getUser();
                }
              });
            }
          } else {
            this.getUser();
          }
        }
      });
    }

    // update user
    openFormU() {
      this.isUserUpdate = true;
    }

    closeFormU() {
      this.isUserUpdate = false;
    }

    updateUser(user_Id, userId, userName, userPwd, userRole) {
      this.newUser = new user(userId, userName, userPwd, userRole.toString(), [{id:null, channelId: null}]);
      this.proddata.updateUser(this.newUser).subscribe((data)=>{
        if (data.ok=="ok"){
          this.getUser();
        }
        else {
          alert("duplicate user");
        }
      })
    }

    // create new user
    openFormC() {
      this.isUserCreate = true;
    }

    closeFormC() {
      this.isUserCreate = false;
    }

    createUser(event) {
      event.preventDefault();
      if (this.userId == null) {
        alert("userId = null ");
      } else {
        this.newUser = new user(this.userId, this.userName, this.userPwd, this.userRole, [{id:null, channelId: null}]);
        this.proddata.createUser(this.newUser).subscribe((data)=> {
          if (data.err == null) {
            this.userId = null;
            this.userName = "";
            this.userPwd = "";
            this.userRole = "";
            alert('new User created');
          } else {
            alert(data.err);
          }
        })
      }
    }

    // user join to chat
    userJoin() {
      this.proddata.getChannels().subscribe((data1)=>{
        this.channels = data1.ok;
        this.proddata.initSocket(sessionStorage.getItem('userRole'));
      this.proddata.getMessage((m)=>{
        this.usernamechat = m[1];
        this.messages.push(m)
      });
      this.proddata.reqroomList(this.channels);
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

  // super admin join to a chat
  joinroom(){
    alert(this.roomslist);
    this.proddata.joinroom(this.roomslist);
    this.proddata.reqnumusers(this.roomslist);
    this.proddata.getnumusers((res)=>{this.numusers = res});
  }

  clearnotice() {
    this.roomnotice = "";
  }

  leaveroom() {
    this.proddata.leaveroom(this.currentroom);
    this.proddata.reqnumusers(this.currentroom);
    this.proddata.getnumusers((res)=>{ this.numusers = res});
    this.roomslist = null;
    this.currentroom ="";
    this.isinRoom = false;
    this.numusers = 0;
    this.roomnotice ="";
    this.messages = [];
  }

  createroom() {
    //this.proddata.createroom(this.newroom);
    //this.proddata.reqroomList();
    //this.newroom ="";
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

