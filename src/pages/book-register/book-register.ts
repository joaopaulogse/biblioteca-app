import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the BookRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-register',
  templateUrl: 'book-register.html',
  providers:[DatabaseProvider]
})
export class BookRegisterPage {

  user: Observable<firebase.User>;
  livro = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public authFB:AngularFireAuth,
    public db:DatabaseProvider
  ) {
    this.user = authFB.authState;//this.navParams.get("user")//usuario da home
    this.livro = !!this.navParams.get("livro") ? this.navParams.get("livro").volumeInfo:''; //livro que o usuário escolhe na bookSearch
  }

  //public book:string = this.livro.title
  ionViewDidLoad() {
    console.log(this.livro);
  }
  
  registerBook(event, livro){
    event.preventDefault();
    const {title, authors, description, categories, pageCount, publisher, publishedDate, read, industryIdentifiers, imageLinks } = livro;
    const book = {
      title: !!title ? title:"", 
      authors: !!authors ? authors:[], 
      description: !!description ? description:"", 
      categories: !!categories ? categories: "", 
      pageCount: !!pageCount ? pageCount: 0, 
      publisher: !!publisher ? publisher: "", 
      publishedDate: !!publishedDate ? publishedDate: "", 
      read: !!read ? read: false,
      isbn_10:!!industryIdentifiers?industryIdentifiers[1].identifier:"",
      isbn_13:!!industryIdentifiers?industryIdentifiers[0].identifier:"",
      image:!!imageLinks?imageLinks.thumbnail || imageLinks.smallThumbnail:""
    };
    this.user.subscribe(user=>{
      this.db.registerBookInUser(user.uid, book).then(obj=>{
        this.navCtrl.setRoot(HomePage);
        console.log(obj);
      });
    });
    
  }

  public cancelRegister(event){
    event.preventDefault();
    this.alertCtrl.create({
      title: "Do you want cancel?",
      message: "asdlfalnds",
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    }).present();
  }
}
