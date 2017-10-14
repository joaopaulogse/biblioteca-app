import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../app/app.component';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs/Observable';
import { BookSearchPage } from '../book-search/book-search';
import { BookRegisterPage } from '../book-register/book-register';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';
import { DataForSearchPage } from '../data-for-search/data-for-search';
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
  providers:[AngularFireAuth, AngularFireDatabase]
})
export class HomePage {
  rootPage: any;
  user: Observable<firebase.User>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menu: MenuController,
    public serviceAuth:AuthProvider,
    public authFB:AngularFireAuth,
    public dbProvider:DatabaseProvider
  ) {
    this.menu.enable(false);
    this.user = authFB.authState
    this.user.subscribe(user=>{
      this.dbProvider.regiterUserInDatabase(user);
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
  }

  logOut(){
    this.serviceAuth.logout();
    this.navCtrl.setRoot(MyApp);
  }

  public goToBookSearch(){
    //this.navCtrl.push(BookSearchPage);
    this.navCtrl.push(DataForSearchPage);
  }

  goToBookRegister(){
    this.navCtrl.push(BookRegisterPage,{user:this.user})
  }
  
}
