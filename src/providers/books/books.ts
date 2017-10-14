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
  private key:string = "1J-mM30lzJO0DyvkEBixd4ro";
  constructor(public http: Http) {

  }

  public getLivroPorIsbn(isbn):any{
    return this.http.get(this.baseApiProvider + isbn);
  }

}
