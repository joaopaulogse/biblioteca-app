import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
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
    public ldCtrl: LoadingController,
    public toast:ToastController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  paginaCadastro(){
    this.navCtrl.push(CadastroPage)
  }

  login(){
    this.loading = this.ldCtrl.create({
      content: 'Loading...',
      dismissOnPageChange:true
    });
    this.loading.present();
    let idTime = setTimeout(()=>{
        this.loading.dismiss();
        this.messagemToast('Verifique a sua conexão, tempo maximo de tentativa atingido');
    }, 10000)
    let user = new UsuarioModel(this.usuario)
    if(!!user.email && !!user.password ){
     this.serviceAuth.login(user.email, user.password)
        .then(user=>{
          this.navCtrl.setRoot(HomePage);
          this.loading.dismiss();
          clearTimeout(idTime);
        })
        .catch(err=>{
          this.messagemToast('Não foi possivel efetuar o login');
          console.log(err);
          this.loading.dismiss();          
          clearTimeout(idTime);
        })
    }else{
      this.loading.dismiss();
      this.messagemToast(`Email e Senha em brancos`)
    } 
        
  }
  messagemToast(message:string){
    this.toast.create({
      message:message,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration:5000
    }).present();
  }
  loginGoogle(){
    this.loading = this.ldCtrl.create({
      content: 'Logando...',
      dismissOnPageChange:true
    });
    this.loading.present();
    let idTime = setTimeout(()=>{
        this.loading.dismiss();
        this.messagemToast('Verifique a sua conexão, tempo maximo de tentativa atingido');
    }, 30000)
    this.serviceAuth.logginGoogle()
        .then(user=>{
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage)
          clearTimeout(idTime);
        })
        .catch(err=>{
          this.messagemToast('Erro ao conectar ao Google');
          console.log(err);
          this.loading.dismiss();
          clearTimeout(idTime);
        })
  }
  
  loginFacebook(){
    this.loading = this.ldCtrl.create({
      content: 'Logando...',
      dismissOnPageChange:true
    });
    this.loading.present();
    let idTime = setTimeout(()=>{
      this.loading.dismiss();
      this.messagemToast('Verifique a sua conexão, tempo maximo de tentativa atingido');
    }, 30000)
    this.serviceAuth.logginFacebook()
        .then(user =>{
          console.log(user)
          this.navCtrl.setRoot(HomePage)
          clearTimeout(idTime);
        })
        .catch(err=>{
          this.loading.dismiss();
          this.messagemToast('Não foi possivel conectar ao Facebook!');
          console.log(err);
          clearTimeout(idTime);
        })
  }
}
