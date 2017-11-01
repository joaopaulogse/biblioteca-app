import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import {DataForSearchPage} from '../data-for-search/data-for-search'
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { BookRegisterPage } from '../book-register/book-register';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
  providers:[
    DatabaseProvider
  ]
})
export class WishListPage {
  user:Observable<firebase.User>;
  listaDesejo = [];
  key:any;
  input:boolean = true;  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth,
    public modal:ModalController,
    public toast:ToastController,
    public actionSheetCtrl: ActionSheetController  ,
    public alertCtrl: AlertController,    
  ) {
    this.user = authFB.authState;
    this.user.subscribe(user=>{
      this.db.getLivroListaDeDesejo(user.uid).auditTrail().subscribe(books=>{
        this.listaDesejo = books; 
      });
    })
  }
  public goToBookSearch(){
    this.navCtrl.push(DataForSearchPage);
  }
  
  viewBook(book){
    this.modal.create(BookRegisterPage,{"livro":{volumeInfo:book.payload.val()},"edit":true,"book":book,"desejo":true}).present();
  }
}