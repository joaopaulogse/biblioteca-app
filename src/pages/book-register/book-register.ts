import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public navParams: NavParams
  ) {
    this.user = this.navParams.get("user")//usuario da home
    this.livro = !!this.navParams.get("livro") ? this.navParams.get("livro"):'' //livro que o usuário escolhe na bookSearch
  }

  //public book:string = this.livro.title
  ionViewDidLoad() {
    console.log(this.livro);
  }
}
