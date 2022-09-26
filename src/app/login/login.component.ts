import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommunicateService } from '../services/communicate.service';
import { group } from '../database/group';
import { channel } from '../database/channel';
import { user } from '../database/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'applicaiton/json'})
};



// for Angular http methods
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  groupDetail = {
    group: '',
    channel: '',
    user: '',
  };

  userDetail = {
    username: '',
    email: '',
    password: '',
    role: '',
    id: '',

  };


  group: group[] = [];
  channel: channel[] = [];
  user: user[] = [];
  userList:any[]=[];
  constructor(private router:Router, private httpClient: HttpClient, private proddata: CommunicateService) { }

  ngOnInit(): void {
    this.proddata.getlist().subscribe((data)=> {
      this.group = data.ok[0];
      this.channel = data.ok[1];
      this.user = data.ok[2];

    })

  }
/*
  logIn(){
    this.httpClient.post(BACKEND_URL + '/login', this.user).subscribe((data:any)=>{
      if (data.ok != false) {
        this.user.valid = 'yes';
        sessionStorage.setItem('username', this.user.username);
        sessionStorage.setItem('role', data.ok);
        sessionStorage.setItem('valid', this.user.valid);
        let role = sessionStorage.getItem('role');
        alert(role);
        if (role == "Super Admin") {
          this.router.navigateByUrl("/super");
        } else if (role == "Group Admin") {
          this.router.navigateByUrl("/admin-user");
        } else if (role == "Group Assis") {
          this.router.navigateByUrl("/assistant");
        } else {
          this.router.navigateByUrl("/users");
        }
      } else {
        alert('Sorry, username or password is not valid');
      }
    });
  }

  delChannel(a:any, b:any) {
    this.groupDetail.group = a;
    this.groupDetail.channel = b;
    this.httpClient.post(BACKEND_URL + '/delChannel', this.groupDetail).subscribe((data:any)=>{
      if (data.ok != false) {
       alert("Channel deleted");
       this.showGC();
      } else {
        alert('show error');
      }
    });
  }

  showGC(){
    this.httpClient.post(BACKEND_URL + '/showGC','').subscribe((data:any)=>{
       if (data.ok != false) {
        this.userList = data.ok;
       } else {
         alert('show error');
       }
     });
  }

  createChannel(a:any) {
    this.groupDetail.group = a;
    this.httpClient.post(BACKEND_URL + '/createChannel', this.groupDetail).subscribe((data:any)=>{
      if (data.ok != false) {
        alert("channel created");
        this.showGC();
      } else {
        alert('show error');
      }
    });
  }

  createGroup() {
    this.httpClient.post(BACKEND_URL + '/createGroup','').subscribe((data:any)=>{
      if (data.ok != false) {
        alert("group created");
        this.showGC();
      } else {
        alert('show error');
      }
    });
  }

  delGroup(a:any) {
    this.groupDetail.group = a;
    this.httpClient.post(BACKEND_URL + '/delGroup',this.groupDetail).subscribe((data:any)=>{
      if (data.ok != false) {
       alert("group deleted");
       this.showGC();
      } else {
        alert('show error');
      }
    });
  }*/

}

