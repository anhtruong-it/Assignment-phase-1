import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment1';
  userName='';

  constructor(private router: Router) {}
  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');

  }

  loginPage(){
    this.userName = sessionStorage.getItem('userName');
    if (this.userName == null){
      this.router.navigateByUrl('/login');
    } else {
      alert("you need to logout")
    }
  }

}
