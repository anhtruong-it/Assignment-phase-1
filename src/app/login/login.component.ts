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
  }

  login(userName, userPwd) {
    this.proddata.login(userName, userPwd).subscribe((data)=> {
      if (data.ok==null) {
        alert('incorrect username or password')
      } else {
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
      }
    })
  }
}

