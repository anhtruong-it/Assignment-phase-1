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
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {
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
  }

  getGC(){
    let username1 = sessionStorage.getItem('username');
    this.httpClient.post(BACKEND_URL + '/getGC',username1).subscribe((data:any)=>{
       if (data.ok != false) {
        let username1 = sessionStorage.getItem('username');
        alert(username1);
        this.userList = data.ok;
        for (let i=0;i<this.userList.length;i++){
          if (this.userList[i].username == username1) {

          }
        }

       } else {
         alert('show error');
       }
     });
  }
}
