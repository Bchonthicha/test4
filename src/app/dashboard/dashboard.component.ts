import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentURL;
  constructor(private route:Router,private auth: AuthService) { }

  ngOnInit() {
    this.currentURL = this.route.url;
    this.route.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        this.currentURL = this.route.url;
      }
    });
  }

  signOut(){
    this.auth.signOut();
  }

}
