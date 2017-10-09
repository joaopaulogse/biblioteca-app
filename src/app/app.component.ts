import { Component,OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "../pages/login/login";

import { HomePage } from '../pages/home/home';
import { AuthProvider } from "../providers/auth/auth";
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authProvider:AuthProvider) {
    this.initializeApp();
    
    this.authProvider.isLogged().subscribe(user=>{
      console.log(user)
      if(user){
        this.rootPage = HomePage
      }else{
        this.rootPage = LoginPage;
      }
    })
  }

  ngOnInit() {
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

 
}
