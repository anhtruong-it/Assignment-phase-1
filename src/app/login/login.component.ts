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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin = true;



  userIds: number;
  user_Ids: number;

  formOpenG = false
  formOpen = false;
  formOpenUGC = false;
  channelId: number;
  channelName: string;
  newChannel : channel;
  newChannels: newchannels;
  testChannels: channel[] = [];
  groupId: number;
  groupName: string;
  newGroup: GCU;

  formOpenU = false
  user_Id: number;
  user_Name: string;
  user_Pwd: string;
  user_Role: string;

  userNameLogin: string;
  PwdLogin: string;


  group: group[] = [];
  channel: channel[] = [];
  user: user[] = [];
  userss: user[] = [];
  gcu: GCU[] = [];

  //add user:
  userId: number = null;
  userName: string = '';
  userPwd: string = '';
  userRole: string = '';
  group_Id: any[] = [
    {id: Number,
    channelId: Number,}
  ];

  newUser: user;
  userobjid: string = '';

  // end

  userstore:string='';
  usernamechat:string='';

  channels:[];


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


  ioConnection:any;
  joinU = false;

  constructor(private router:Router, private httpClient: HttpClient, private proddata: CommunicateService) { }

  ngOnInit(): void {
    /*
    this.userstore = sessionStorage.getItem('userName');

    this.proddata.getUser().subscribe((data)=> {
      this.user = data.ok;
      this.userss = data.ok;
      return this.user;
    })
    */
   //this.GCU();
  }

  login(userName, userPwd) {
    this.proddata.login(userName, userPwd).subscribe((data)=> {
      alert(data.ok.userRole);

      if (data.ok.userRole == 'Super Admin') {
          this.router.navigateByUrl('/super');
          this.isLogin = false;
          sessionStorage.setItem('userName', data.ok.userName);
          sessionStorage.setItem('userId', data.ok.userId);
          sessionStorage.setItem('userPwd', data.ok.userPwd);
          sessionStorage.setItem('userRole', data.ok.userRole);
        } else if (data.ok.userRole == 'Group Assis') {
          this.router.navigateByUrl('/assistant');
          sessionStorage.setItem('userName', data.ok.userName);
          sessionStorage.setItem('userId', data.ok.userId);
          sessionStorage.setItem('userPwd', data.ok.userPwd);
          sessionStorage.setItem('userRole', data.ok.userRole);
        } else if (data.ok.userRole == 'Group Admin') {
          this.router.navigateByUrl('/admin-user');
          sessionStorage.setItem('userName', data.ok.userName);
          sessionStorage.setItem('userId', data.ok.userId);
          sessionStorage.setItem('userPwd', data.ok.userPwd);
          sessionStorage.setItem('userRole', data.ok.userRole);
        } else if (data.ok.userRole == 'member') {
          this.router.navigateByUrl('/users');
          sessionStorage.setItem('userName', data.ok.userName);
          sessionStorage.setItem('userId', data.ok.userId);
          sessionStorage.setItem('userPwd', data.ok.userPwd);
          sessionStorage.setItem('userRole', data.ok.userRole);
        } else {
          alert("invalid user");
        }
    })
  }



  join() {
    this.joinU = true;
    //this.userJoin();


  }

  userJoin() {

    this.proddata.initSocket(sessionStorage.getItem('userRole'));
    this.proddata.getMessage((m)=>{

      this.usernamechat = m[1];
    //  alert(this.userstore);
      this.messages.push(m)});
      alert(this.channels);
    this.proddata.reqroomList(this.channels);
    this.proddata.getroomList((msg)=>{ this.rooms = JSON.parse(msg)});
    this.proddata.notice((msg)=>{ this.roomnotice = msg});
    this.proddata.joined((msg)=>{ this.currentroom = msg
      if(this.currentroom != ""){
        this.isinRoom = true;
      }else{
        this.isinRoom = false;
      }
    });
  }

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

  GCU() {

    this.proddata.getGCU().subscribe((data)=> {
      this.gcu = data.ok;
      this.proddata.getChannels().subscribe((data1)=>{
        this.channels = data1.ok;
       // alert(this.channels);
      })

    })
  }

  addChannel(groupd_id, channelId, channelName) {

    this.channelId = channelId;
    this.channelName = channelName;
    this.newChannel = new channel(this.channelId, this.channelName,groupd_id);

    this.proddata.addChannel(this.newChannel).subscribe((data)=> {
      if (data.ok=="ok") {
        alert("added");
        this.GCU();
        this.channelId=null;
        this.channelName="";
      } else {
        alert("false");
        this.GCU();
      }
    });
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

  deleteGroup(groupId){
    if (confirm("Are you sure you want to delete this group")) {
      this.proddata.deleteGroup(groupId).subscribe((data)=> {
        //this.product = data;
        if(data) {
          this.GCU();
        }

      });
    }
  }

  deleteChannel(groupId, channelId){
    alert([groupId, channelId]);
    if (confirm("Are you sure you want to delete this channel")) {
      this.proddata.deleteChannel(groupId, channelId).subscribe((data)=> {
        //this.product = data;
        if(data.ok == "ok") {
          this.GCU();
        }

      });
    }
  }

  testChannel(){
    this.proddata.testChannel().subscribe((data)=> {
      this.testChannels = data.ok;

    })
  }

  getChannels(){

  }

  openForm() {
    this.formOpen = true;
  }

  closeForm() {
    this.formOpen = false;
  }

  openFormG() {
    this.formOpenG = true;
  }

  closeFormG() {
    this.formOpenG = false;
  }

  openFormU() {
    this.formOpenU = true;
  }

  closeFormU() {
    this.formOpenU = false;
  }

  openFormUGC() {
    this.formOpenUGC = true;
  }

  closeFormUGC() {
    this.formOpenUGC = false;
  }


  createUser(event) {
    event.preventDefault();
    if (this.userId == null) {
      alert("userId = null ");
    } else {
      //alert("ok");
      this.newUser = new user(this.userId, this.userName, this.userPwd, this.userRole, [{id:null, channelId: null}]);
      this.proddata.createUser(this.newUser).subscribe((data)=> {
        console.log(data);
        if (data.err == null) {
          alert('new User created');
        } else {
          alert(data.err);
        }
        this.userId = null;
        this.userName = "";
        this.userPwd = "";
        this.userRole = "";
        this.router.navigateByUrl('/login');

      })
    }
  }

  getUser() {
    this.proddata.getUser().subscribe((data)=> {
      this.user = data.ok;
      return this.user;

    })
  }

  deleteUser(userId) {
    this.proddata.deleteUser(userId).subscribe((data)=>{
      if (data.ok != false){
        if (data.ok[1].length > 0){
          for(let g of data.ok[1]){
            alert("enter to remove this user from Channel!");
            //this.GCU();
            this.proddata.removeUser(data.ok[0], g.id, g.channelId).subscribe((data1)=>{
              if (data1.ok=='ok'){
                alert("user removed");
                this.getUser();
                //this.GCU();
              }
            })
          }
        } else {
          this.getUser();
        }
      }


    })
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




  addUserGC(userId, groupId, channelId) {
   // this.user_Ids = userId.toString();
   // alert(userId)
    this.proddata.addUserGC(userId.toString(), groupId, channelId).subscribe((data)=>{

      if (data.ok == "ok"){
        alert("user added");
        this.GCU();
        this.getUser();
      }
      else {
        alert(data.ok);
      }

    })
  }

  removeUser(userId, groupId, channelId) {
    //alert([userId, groupId, channelId]);
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





}

