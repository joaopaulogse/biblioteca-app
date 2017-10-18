import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
    public alert:AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
  }

  public getDados():any{
    return this.dados;
  }

  public receivingDataFromUser(dados){
    if(!!dados.isbn){
       this.navCtrl.push(BookSearchPage, {"isbn":dados.isbn})
    }else if(!!dados.title || !!dados.author){
      this.navCtrl.push(BookSearchPage, {"title":dados.title, "author":dados.author})
    }else{
      this.alert.create({
        title:'ERRO',
        message:'Wrong fields',
        buttons:['OK']
      }).present()
    }
  }

  public help(){
    this.toastCtrl.create({
      message: "A pesquisa será realizada com os parâmetros digitados acima. No entando, a pesquisa prioriza o ISBN, que é o código único do  livro. ",
      showCloseButton: true,
      closeButtonText: 'Ok'
    }).present();
  }
  
}
