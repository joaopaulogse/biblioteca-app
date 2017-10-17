import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksUserPage } from './books-user';

@NgModule({
  declarations: [
    BooksUserPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksUserPage),
  ],
})
export class BooksUserPageModule {}
