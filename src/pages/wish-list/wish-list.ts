import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {DataForSearchPage} from '../data-for-search/data-for-search'
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { BookRegisterPage } from '../book-register/book-register';


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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth,
    public modal:ModalController,    
  ) {
    this.user = authFB.authState;
    this.user.subscribe(user=>{
      this.db.getLivroListaDeDesejo(user.uid).auditTrail().subscribe(books=>{
        this.listaDesejo = books; 
        console.log(this.listaDesejo);
      });
    })
  }
  public goToBookSearch(){
    this.navCtrl.push(DataForSearchPage);
  }
}
