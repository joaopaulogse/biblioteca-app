import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { BooksProvider } from '../../providers/books/books';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { DataForSearchPage } from '../data-for-search/data-for-search';
import { BookRegisterPage } from '../book-register/book-register';
import { WishListPage } from '../wish-list/wish-list'
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
/**
 * Generated class for the BookSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-search',
  templateUrl: 'book-search.html',
  providers: [
    AngularFireAuth,
    BooksProvider,
    DatabaseProvider
  ]
})
export class BookSearchPage {

  user: Observable<firebase.User>;
  public list_books = new Array<any>();
  loading:Loading
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceAuth:AuthProvider,
    public authFB:AngularFireAuth,
    public booksProvider: BooksProvider,
    public ldCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public db:DatabaseProvider,
  ) {
    this.user = authFB.authState;
  }

  ionViewDidLoad() {
    this.loading = this.ldCtrl.create({
      content: 'Search...'
    });
    this.loading.present();
    let _isbn:number = this.navParams.get('isbn');
    let _title:string = this.navParams.get('title');
    let _author:string = this.navParams.get('author')
    //let search = !!isbn ? isbn : !!title ? title : !!autor ? autor : '';
    let search = {
      isbn: _isbn,
      title: _title,
      author: _author
    }
    
    this.booksProvider.getLivro(search)
    .subscribe(data=>{
      const items = data.json();
      !!items ? this.list_books = items.items :'';
      this.loading.dismiss();
            //console.log(items);
            if(items.totalItems == 0){
                const alert = this.alertCtrl.create({
                  title: "No results",
                  subTitle: "Sorry! Search with no results.",
                  buttons: ["OK"]
                });
                alert.present();
                this.navCtrl.pop();
            }
      },erro=>{
        this.loading.dismiss();
        console.log("Erro na busca",erro);
      })
    }

    public livro = {};
    public redirectToRegister(book:any):any{
      this.livro = book;
      console.log(this.livro);
      console.log(book);
      this.modalCtrl.create(BookRegisterPage,{"livro":this.livro}).present();
    }
    public addToWishList(book:any):any{
      const {title, authors, description, categories, pageCount, publisher, publishedDate, read, industryIdentifiers, imageLinks, isbn } = book.volumeInfo;
        const livro = {
          title: !!title ? title:"", 
          authors: !!authors ? authors:[], 
          description: !!description ? description:"", 
          categories: !!categories ? categories: "", 
          pageCount: !!pageCount ? pageCount: 0, 
          publisher: !!publisher ? publisher: "", 
          publishedDate: !!publishedDate ? publishedDate: "", 
          read: !!read ? read: false,
          isbn_10:!!industryIdentifiers?industryIdentifiers[1].identifier:"",
          isbn_13:!!industryIdentifiers || !!isbn?industryIdentifiers[0].identifier || isbn:"",
          image:!!imageLinks? imageLinks.thumbnail || imageLinks.smallThumbnail:""
        };
        this.user.subscribe(user=>{
          this.db.inserirLivroListaDesejo(user.uid, livro).then(()=>{
            this.navCtrl.push(WishListPage).then(page=>{
            })
            .catch(err=>{
              console.log(err)
            })
          })
        })
    }
    public buscaAuthor(author:string){
      this.navCtrl.push(BookSearchPage, {"author":author});
    }

}
