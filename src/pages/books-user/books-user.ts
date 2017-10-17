import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the BooksUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-books-user',
  templateUrl: 'books-user.html',
  providers:[DatabaseProvider]
})
export class BooksUserPage {
  user:Observable<firebase.User>
  books = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth
  ) {
    this.user = authFB.authState;
    this.user.subscribe(user=>{
      this.db.getBooksInTheUser(user.uid).subscribe(books=>{
        this.books = books
        console.log(books);
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksUserPage');
  }

}
