import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import * as firebase from 'firebase'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { BooksReadPage } from '../books-read/books-read';
import { BooksNoReadPage } from '../books-no-read/books-no-read';
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
  read = BooksReadPage;
  noRead = BooksNoReadPage;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth
  ) {
    this.user = authFB.authState;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksUserPage');
  }
}
