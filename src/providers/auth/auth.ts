import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;
  
    constructor(public firebaseAuth: AngularFireAuth) {
      this.user = firebaseAuth.authState;
    }
  
    signup(email: string, password: string) {
      return this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
         
    }
  
    login(email: string, password: string) {
      return this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
    }
  
    isLogged(){
        // if(!!this.user){

        // this.user.subscribe(val => {
        //   console.log(val)
        //     if (val.email) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        // });
        // return true;
        // }else{
        //   return false;
        // }
        return this.user;
        
    }

    logout() {
      this.firebaseAuth
        .auth
        .signOut();
    }

}
