import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataForSearchPage } from './data-for-search';

@NgModule({
  declarations: [
    DataForSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DataForSearchPage),
  ],
})
export class DataForSearchPageModule {}
