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
  foto:any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthProvider,
    public authFB:AngularFireAuth
  ) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  enviaImage(event){
    if(event.target.files[0]){
      this.foto = event.target.files[0];
      (<HTMLImageElement>document.querySelector('#imageCadastro')).src = URL.createObjectURL(event.target.files[0]);
    }
  }

  cadastrarUsuario(){
    // console.log(this.usuario)
    let user = new UsuarioModel(this.usuario)
    this.toBase64(this.foto).then(foto=>{
      user.photoURL = foto.toString()
    })
    console.log(user)
    this.authService.signup(user.email, user.password).then((usuario:firebase.User)=>{
     usuario.updateProfile({
       displayName:user.username,
       photoURL:user.photoURL
     });
      this.navCtrl.setRoot(MyApp)
    })
  }
  toBase64(file){
    var reader = new FileReader();
    return new Promise((resolve, reject)=>{
      
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    })
  }
}