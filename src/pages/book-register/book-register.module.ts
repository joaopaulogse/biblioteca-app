import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookRegisterPage } from './book-register';

@NgModule({
  declarations: [
    BookRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(BookRegisterPage),
  ],
})
export class BookRegisterPageModule {}
