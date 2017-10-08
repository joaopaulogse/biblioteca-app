import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AngularFireAuth]
})
export class HomePage {
  rootPage: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    menu: MenuController,
    public serviceAuth:AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut(){
    this.serviceAuth.logout();
    this.navCtrl.setRoot(MyApp);
  }

}
