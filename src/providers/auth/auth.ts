import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { ToastController } from "ionic-angular";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController
  ) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
     return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLogged() {
    return this.user;
  }

  logginGoogle(): Promise<void> {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logginFacebook(): Promise<void>{
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }
}
