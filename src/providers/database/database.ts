import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import 'rxjs/add/operator/map';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(
    public http: Http,
    public database:AngularFireDatabase
  ) {
    console.log('Hello DatabaseProvider Provider');
  }
  regiterUserInDatabase(user:firebase.User){
    //nao pode enviar a foto
    return this.database.object(`users/${user.uid}`).update({
      username:user.displayName,
      email:user.email,
      lastLogin: new Date().toLocaleString()
    })
  }
  registerBookInUser(idUser, objeto){
    const book = []
    book.push(objeto)
    return this.database.list(`users/${idUser}/livros`).push(objeto)
  }
}
