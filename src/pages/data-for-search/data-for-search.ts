import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookSearchPage } from '../book-search/book-search';

/**
 * Generated class for the DataForSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    //console.log(dados);
    return this.dados;
  }

  public receivingDataFromUser(dados){
    //console.log("dados vindos do formulário");
    //console.log(dados);
    this.navCtrl.push(BookSearchPage, this.getDados());
  }

}
