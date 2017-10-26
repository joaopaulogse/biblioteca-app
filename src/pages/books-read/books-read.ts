import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { CallBooksProvider } from '../../providers/call-books/call-books';
import * as firebase from 'firebase'
import { BookRegisterPage } from '../book-register/book-register';


/**
 * Generated class for the BooksReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-books-read',
  templateUrl: 'books-read.html',
  providers:[DatabaseProvider, CallBooksProvider]
})
export class BooksReadPage extends CallBooksProvider {

  user:Observable<firebase.User>
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modal:ModalController,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth
  ) {
    super(navCtrl, navParams, db, authFB);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksReadPage');
  }

  viewBook(book_read){
    this.modal.create(BookRegisterPage,{"livro":{volumeInfo:book_read}, "edit":true}).present();
  }
}
