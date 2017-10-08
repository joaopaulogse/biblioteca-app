import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceAuth: AuthProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  paginaCadastro(){
    this.navCtrl.push(CadastroPage)
  }

  login(){
    let user = new UsuarioModel(this.usuario)
    this.serviceAuth.login(user.email, user.password)
        .then(user=>{
          console.log(user)
          this.navCtrl.setRoot(HomePage)
        })
  }
}
