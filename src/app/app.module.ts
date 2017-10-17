import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from "../pages/login/login";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from 'angularfire2'
import configFirebase from '../config/configFirebase'
import { AuthProvider } from '../providers/auth/auth'; 
import { HomePage } from '../pages/home/home';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AngularFireAuth } from 'angularfire2/auth';
import { BooksProvider } from '../providers/books/books';
import { BookSearchPage } from '../pages/book-search/book-search';
import { HttpModule } from '@angular/http';
import { BookRegisterPage } from '../pages/book-register/book-register';
import { DatabaseProvider } from '../providers/database/database';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { DataForSearchPage } from '../pages/data-for-search/data-for-search';
import { Camera } from '@ionic-native/camera';
import { BooksUserPage } from '../pages/books-user/books-user';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    CadastroPage,
    BookSearchPage,
    BookRegisterPage,
    DataForSearchPage,
    BooksUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configFirebase),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    CadastroPage,
    BookSearchPage,
    BookRegisterPage,
    DataForSearchPage,
    BooksUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    BooksProvider,
    DatabaseProvider,
    AngularFireDatabaseProvider,
    Camera
  ]
})
export class AppModule {}
