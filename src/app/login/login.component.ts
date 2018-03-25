import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hide =true;
emailSignup: string;
passwordSignup: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    console.log(this.emailSignup,this.passwordSignup);
    this.auth.emailLogin(this.emailSignup,this.passwordSignup);
  }

  logout(){
    this.auth.signOut();
  }
}
