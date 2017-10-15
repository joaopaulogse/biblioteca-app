import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BooksProvider {

  private baseApiProvider:string = "https://www.googleapis.com/books/v1/volumes?q=";
 // https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
  private key:string = "12d916b1345813fcdd9b5b2805841ee1e754d112";
  constructor(public http: Http) {

  }

  public getLivro(search):any{
    return this.http.get(`${this.baseApiProvider}
                ${!!search.isbn ? search.isbn
                  :!!search.title && !!!search.author ? "intitle:"+encodeURI(search.title)
                  :!!search.author && !!!search.title ? "inauthor:" + encodeURI(search.author)
                  :encodeURI(search.title) + "+inauthor:" + encodeURI(search.author)}&maxResults=40`);
  }
}
