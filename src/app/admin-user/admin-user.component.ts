import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'applicaiton/json'})
};


// for Angular http methods
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
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
    newRole:'',
    id: '',
  };


  userList:any[]=[];
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    //this.getUsers();
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
  }

  getUsers() {
    this.httpClient.post(BACKEND_URL + '/getUsers', "").subscribe((data:any)=>{
      if (data.ok != false) {
        this.userList =data.ok;
      } else {
        alert('Sorry, username or password is not valid');
      }
    });
    for (let i=0;i<this.userList.length;i++) {
      this.userList[i].username;
      this.userList[i].password;
      this.userList[i].email;
      this.userList[i].role;
      this.userList[i].id;
    }
  }


  upgradeUsers(a:any, b:any, c:any) {
    this.userDetail.username = a;
    this.userDetail.role = b;
    this.userDetail.newRole = c;
    if (this.userDetail.role != 'member') {
      alert("You only can upgrade a member!")
    } else {
      this.httpClient.post(BACKEND_URL + '/upgradeUsers', this.userDetail).subscribe((data:any)=>{
        if (data.ok != false) {
          alert("user upgraded")
          this.getUsers();
        } else {
          alert('invalid');
        }
      });
    }
  }
}
