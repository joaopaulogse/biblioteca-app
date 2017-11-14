import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseApp } from 'angularfire2'
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
import 'firebase/storage'
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {
  public firebaseApp: FirebaseApp;
  constructor(
    public fireApp:FirebaseApp,
    public http: Http,
    public database:AngularFireDatabase
  ) {
    this.firebaseApp = fireApp;
  }
  enviarPDF(email, file){
    console.log(file);
    
    return this.firebaseApp.storage().ref(`pdfs/${email}/${file.name}`).put(file, {contentType:file.type});
  }
}
