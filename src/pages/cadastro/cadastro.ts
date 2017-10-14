import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms'
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UsuarioModel } from '../../models/UsuarioModel';
import { AngularFireAuth } from 'angularfire2/auth';
import {ValidadorDeEmail} from './ValidadorDeEmail';
import { MyApp } from '../../app/app.component';
import * as firebase from 'firebase'
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
  loading: Loading;
  meuForm: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthProvider,
    public authFB:AngularFireAuth,
    public ldCtrl: LoadingController,
    public fb: FormBuilder
  ) { 
    this.meuForm = fb.group({
      username:  ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, ValidadorDeEmail.validador])],
      foto: ['']
    })
   }

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
    this.loading = this.ldCtrl.create({
      content: 'Carregando...',
      dismissOnPageChange:true
    });
    let user = new UsuarioModel(this.usuario)
    this.toBase64(this.foto).then(foto=>{
      user.photoURL = foto.toString()
    }).catch(err=>console.log(err))
    console.log(user)
    this.authService.signup(user.email, user.password).then((usuario:firebase.User)=>{
     usuario.updateProfile({
       displayName:user.username,
       photoURL:user.photoURL,
     });
      this.navCtrl.setRoot(MyApp)
    })
  }
  toBase64(file:File){
    let reader = new FileReader();
    console.log(file)
    return new Promise((resolve, reject)=>{
      if(file.size > 2000000){
        reject({error:"Imagem superior a 2MB, tente uma menor"})
      }
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
        reject(error);
      };
    })    
  }
}