import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishListPage } from './wish-list';

@NgModule({
  declarations: [
    WishListPage,
  ],
  imports: [
    IonicPageModule.forChild(WishListPage),
  ],
})
export class WishListPageModule {}
