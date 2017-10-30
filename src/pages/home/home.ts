import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController } from 'ionic-angular';
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
import { WishListPage } from '../wish-list/wish-list';
import { LoginPage } from '../login/login';
import { Perfil } from '../perfil/perfil'
import * as Papa from 'papaparse'
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    AngularFireAuth, 
    AngularFireDatabase,
    Camera, 
    BarcodeScanner]
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
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public file: File
  ) {
    this.menu.enable(false);
    this.user = authFB.authState
    this.user.subscribe(user=>{
      this.dbProvider.regiterUserInDatabase(user);
    }, err=>{
      console.log(err);
    })
  }
  ngOnInit(){
    this.rootPage = BooksUserPage;
  }
  ionViewDidLoad() {
  }

  public redirectToHome(){
    this.rootPage = BooksUserPage;
    this.menu.close();
  }
  public redirectToWishList(){
    this.rootPage = WishListPage;
    this.menu.close();
  }
  public exportLibrary(){
    this.alertCtrl.create({
      title: "Exportar biblioteca",
      message: "Tem certeza que deseja exportar a biblioteca para uma planilha (formato <i>.csv</i>)?",
      buttons: [
        {
          text: "Cancelar",
        },
        {
          text: "OK",
          handler: () => {
            this.convertToCSV();
          }
        }
      ]
    }).present();
  }

  /*this method convert json to csv and does download file*/
  public convertToCSV(){
    this.user.subscribe(user=>{
      this.dbProvider.getBooksInTheUser(user.uid).valueChanges().subscribe(books=>{
        let csv = Papa.unparse(books);

        var blob = new Blob([csv]);
        this.file.writeFile(this.file.applicationStorageDirectory, "library.csv", blob);
        /*if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
            window.navigator.msSaveBlob(blob, "library.csv");
        else
        {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = "library.csv";
            document.body.appendChild(a);
            a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a);
        }*/
      })
    });
    
  }
  public redirectToPerfil(){
    this.navCtrl.push(Perfil);
  }

  logOut(){
    // this.serviceAuth.logout();
    this.authFB.auth.signOut()
      .then(()=>{
        this.navCtrl.setRoot(LoginPage);
      })
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
          title: "Sem captura",
          subTitle: "O scanner não conseguiu capturar o código de barras",
          buttons: ["OK"]
        }).present();
        this.navCtrl.popTo(HomePage);
      }
    }, (err) => {
      _alert => {
        this.alertCtrl.create({
          title: "Um erro ocorreu",
          subTitle: "O scanner não conseguiu capturar o código de barras",
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
