import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksReadPage } from './books-read';

@NgModule({
  declarations: [
    BooksReadPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksReadPage),
  ],
})
export class BooksReadPageModule {}
