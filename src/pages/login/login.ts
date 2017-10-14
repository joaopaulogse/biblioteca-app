import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { AngularFireAuth } from "angularfire2/auth";
import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from "../home/home";
import { UsuarioModel } from '../../models/UsuarioModel';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthProvider, AngularFireAuth]
})
export class LoginPage {
  usuario = {};
  loading: Loading;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceAuth: AuthProvider,
    public ldCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  paginaCadastro(){
    this.navCtrl.push(CadastroPage)
  }

  login(){
    this.loading = this.ldCtrl.create({
      content: 'Logando...',
      dismissOnPageChange:true
    });
    this.loading.present();
    let user = new UsuarioModel(this.usuario)
    this.serviceAuth.login(user.email, user.password)
        .then(user=>{
          console.log("@ID:",user.uid)
          this.navCtrl.setRoot(HomePage)
        })
  }

  loginGoogle(){
    this.loading = this.ldCtrl.create({
      content: 'Logando...',
      dismissOnPageChange:true
    });
    this.loading.present();
    this.serviceAuth.logginGoogle()
        .then(user=>{
          console.log(user)
          this.navCtrl.setRoot(HomePage)
        })
  }
  
  loginFacebook(){
    this.loading = this.ldCtrl.create({
      content: 'Logando...',
      dismissOnPageChange:true
    });
    this.loading.present();
    this.serviceAuth.logginFacebook()
    .then(user =>{
      console.log(user)
      this.navCtrl.setRoot(HomePage)
    })
  }
}
