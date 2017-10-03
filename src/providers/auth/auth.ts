import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;
  
    constructor(private firebaseAuth: AngularFireAuth) {
      this.user = firebaseAuth.authState;
    }
  
    signup(email: string, password: string) {
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Cadastrado!', value);
        })
        .catch(err => {
          console.log('Erro ao cadastrar',err.message);
        });    
    }
  
    login(email: string, password: string) {
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          console.log('Logado!');
        })
        .catch(err => {
          console.log('Erro ao Logar: ',err.message);
        });
    }
  
    logout() {
      this.firebaseAuth
        .auth
        .signOut();
    }

}
