import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment1';
  constructor(private router: Router) {}
  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');

  }
  /*
  checkValid(){
    if (sessionStorage.getItem('valid') == 'no' || sessionStorage.getItem('valid') ==null){
      this.router.navigateByUrl('/login');
    } else {
      alert("You need to log out before log in!");
    }
  }*/
}
