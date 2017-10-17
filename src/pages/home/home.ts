import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
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
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { BooksUserPage } from '../books-user/books-user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AngularFireAuth, AngularFireDatabase,Camera, BarcodeScanner]
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
    public dbProvider:DatabaseProvider,
    public barcodeScanner: BarcodeScanner,
    public alertCtrl: AlertController
  ) {
    this.menu.enable(false);
    this.user = authFB.authState
    this.user.subscribe(user=>{
      this.dbProvider.regiterUserInDatabase(user);
    })
  }
  ngOnInit(){
    this.rootPage = BooksUserPage;
  }
  ionViewDidLoad() {
  }

  logOut(){
    this.serviceAuth.logout();
    this.navCtrl.setRoot(MyApp);
  }

  // this method takes to DataForSearchPage
  public goToBookSearch(){
    this.navCtrl.push(DataForSearchPage);
  }

  /* this method try scanner some barcode
     if it can, the isbn is redirected to book search page
     else, an alert will be shown to user
  */
  public goToBarcode(){
    this.barcodeScanner.scan().then((barcodeData) => {
      !!barcodeData.text ? 
      this.navCtrl.push(BookSearchPage, {"isbn":barcodeData.text}): 
      _alert => {
        this.alertCtrl.create({
          title: "No capture",
          subTitle: "The scanner couldn't capture a barcode",
          buttons: ["OK"]
        }).present();
        this.navCtrl.popTo(HomePage);
      }
    }, (err) => {
      _alert => {
        this.alertCtrl.create({
          title: "An error occurred",
          subTitle: "The scanner couldn't capture a barcode",
          buttons: ["OK"]
        }).present();
        this.navCtrl.popTo(HomePage);
      }});
  }

  //this method redirect to book register page
  goToBookRegister(){
    this.navCtrl.push(BookRegisterPage,{user:this.user})
  }
  
}
