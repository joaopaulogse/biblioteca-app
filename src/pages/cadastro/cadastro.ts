import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UsuarioModel } from '../../models/UsuarioModel';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers:[AngularFireAuth]
})
export class CadastroPage {
  usuario = {}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthProvider
  ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  enviaImage(event){
    if(event.target.files[0]){
      (<HTMLImageElement>document.querySelector('#imageCadastro')).src = URL.createObjectURL(event.target.files[0])
    }
  }

  cadastrarUsuario(){
    // console.log(this.usuario)
    let user = new UsuarioModel(this.usuario)
    console.log(user)
    this.authService.signup(user.email, user.password).then(usuario=>{
      console.log(usuario);
      this.navCtrl.setRoot(MyApp)
    })
    
  }

}
