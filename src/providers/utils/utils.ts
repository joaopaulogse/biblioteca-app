import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor(public http: Http) {
    console.log('Hello UtilsProvider Provider');
  }

  toBase64(file:File){
    let reader = new FileReader();
    console.log(file)
    return new Promise((resolve, reject)=>{
      if(file.size > 2000000){
        reject({error:"Imagem superior a 2MB, tente uma menor"})
      }
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    })    
  }
}
