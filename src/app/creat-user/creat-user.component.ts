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
  selector: 'app-creat-user',
  templateUrl: './creat-user.component.html',
  styleUrls: ['./creat-user.component.css']
})
export class CreatUserComponent implements OnInit {


  user = {
    username:'',
    password:'',
    email:'',
    role:'',
  }
  constructor(private router:Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  /*create(){
    this.httpClient.post(BACKEND_URL + '/create', this.user).subscribe((data:any)=>{
      if (data.ok!=false) {
        alert("User created");
        this.router.navigateByUrl('/super');
      } else {
        alert('Sorry, username or password is not valid');
      }
    });
  }*/
}
