import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  rootPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, menu: MenuController) {
    menu.enable(true)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
