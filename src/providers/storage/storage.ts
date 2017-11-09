import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase'
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    public http: Http,
  ) {
  }
  enviarPDF(idUser, file){
    return firebase.storage().ref(`pdfs/${idUser}`).put(file);
  }
}
