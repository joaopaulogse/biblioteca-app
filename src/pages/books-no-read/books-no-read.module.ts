import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksNoReadPage } from './books-no-read';

@NgModule({
  declarations: [
    BooksNoReadPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksNoReadPage),
  ],
})
export class BooksNoReadPageModule {}
