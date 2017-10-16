import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
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
})
export class BookRegisterPage {

  user: Observable<firebase.User>;
  livro = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.user = this.navParams.get("user")//usuario da home
    this.livro = !!this.navParams.get("livro") ? this.navParams.get("livro").volumeInfo:'' //livro que o usuário escolhe na bookSearch
  }

  //public book:string = this.livro.title
  ionViewDidLoad() {
    console.log(this.livro);
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
    })
  }
}
