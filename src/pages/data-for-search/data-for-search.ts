import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookSearchPage } from '../book-search/book-search';

@IonicPage()
@Component({
  selector: 'page-data-for-search',
  templateUrl: 'data-for-search.html',
})
export class DataForSearchPage {

  public dados = {};
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad DataForSearchPage');
   
  }

  public getDados():any{
    return this.dados;
  }

  public receivingDataFromUser(dados){
    this.navCtrl.push(BookSearchPage, this.getDados());
  }
  
}
