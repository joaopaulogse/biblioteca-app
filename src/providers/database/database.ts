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
  regiterUserInDatabase(user:firebase.User):Promise<void>{
    //nao pode enviar a foto
    return this.database.object(`users/${user.uid}`).update({
      username:user.displayName,
      email:user.email,
      lastLogin: new Date().toLocaleString()
    })
  }
  registerBookInUser(idUser, objeto){
    return this.database.list(`users/${idUser}/livros`).push(objeto)
  }
  getBooksInTheUser(idUser){
    return this.database.list(`users/${idUser}/livros`);
  }
  alterarLivro(idUser, key, book){
    return this.database.object(`users/${idUser}/livros/${key}`).update({...book})
  }
  excluirLivro(idUser, key){
    return this.database.object(`users/${idUser}/livros/${key}`).remove()
  }
  
  inserirLivroListaDesejo(idUser, book){
    return this.database.list(`users/${idUser}/lista_de_desejos`).push(book);
  }
  getLivroListaDeDesejo(idUser){
    return this.database.list(`users/${idUser}/lista_de_desejos`);
  }

}
