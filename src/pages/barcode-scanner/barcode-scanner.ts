import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { BookSearchPage } from '../book-search/book-search';

/**
 * Generated class for the BarcodeScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html',
  providers: [
    Camera,
    BarcodeScanner
  ]
})
export class BarcodeScannerPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner
  ) {
  }

  ionViewDidLoad() {
    this.barcodeScanner.scan().then((barcodeData) => {
        this.navCtrl.push(BookSearchPage, barcodeData);
    }, (err) => {
         // An error occurred
    });
  }
}