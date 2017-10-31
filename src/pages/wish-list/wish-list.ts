import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home'
import {DataForSearchPage} from '../data-for-search/data-for-search'

@IonicPage()
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
})
export class WishListPage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {}

  public goToBookSearch(){
    this.navCtrl.push(DataForSearchPage);
  }
}
