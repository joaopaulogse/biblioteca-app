import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'
import { Book } from "../../models/Book";

/*
  Generated class for the CallBooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallBooksProvider {

  user:Observable<firebase.User>
  books_read: any;
  books_no_read:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth,
    public http?:Http
  ) {
    this.user = authFB.authState;
    this.user.subscribe(user=>{
      this.db.getBooksInTheUser(user.uid).valueChanges().subscribe((books:Book[])=>{
        this.limitCharOfTitle(books);
        this.books_read = books.filter(book => book.read == true);
        this.books_no_read = books.filter(book => book.read == false);
      }, err=>{
        console.log(err);
      })
    })
  }

  public limitCharOfTitle(books: Book[]){
      return books.map(book => book.title =  book.title.length > 20 ? 
      book.title.substr(0,21)+"...":
      book.title);
  }
}
