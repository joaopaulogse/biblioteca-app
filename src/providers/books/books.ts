import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BooksProvider {

  private baseApiProvider:string = "https://www.googleapis.com/books/v1/volumes?q=";
 // https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
  private key:string = "12d916b1345813fcdd9b5b2805841ee1e754d112";
  constructor(public http: Http) {

  }

  public getLivro(search):any{
    if(search.isbn !== undefined){
      return this.http.get(this.baseApiProvider + search.isbn + `&maxResults=40`);
    }else if(search.title !== undefined && search.author === undefined){
      return this.http.get(this.baseApiProvider + "intitle:" + encodeURI(search.title) + `&maxResults=40`);
    } else if(search.title === undefined && search.author !== undefined){
      return this.http.get(this.baseApiProvider + "inauthor:" + encodeURI(search.author) + `&maxResults=40`);
    } else {
      console.log(1111);
      console.log(this.baseApiProvider + encodeURI(search.title) + "+inauthor:" + encodeURI(search.author));
      return this.http.get(this.baseApiProvider + encodeURI(search.title) + "+inauthor:" + encodeURI(search.author) + `&maxResults=40`);
    }
  }
}
