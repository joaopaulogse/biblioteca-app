import { Component} from '@angular/core'
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {UtilsProvider} from '../../providers/utils/utils'
import { DatabaseProvider } from '../../providers/database/database';
import { UsuarioModel } from '../../models/UsuarioModel';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase'

@IonicPage()
@Component({
    selector: 'perfil',
    templateUrl: 'perfil.html',
    providers:[DatabaseProvider, UtilsProvider]
})
export class Perfil{

    user: Observable<firebase.User>;
    usuario = {};
    button:boolean = true
    confirmaSenha:string;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public db:DatabaseProvider,
        public autFB:AngularFireAuth,
        public toastCtrl:ToastController,
        public util:UtilsProvider
    ){
        this.user = autFB.authState;
    
    }
/* Heitor mandou eu comentar o método. Então, gostaria de dizer que esse cara faz algo simplesmente absurdo.
É simplesmente incrível como este cara altera os os valores de nome, senha e também permite a inserção de uma
INACREDITÁVEL foto nova.
*/
    alterarDados(usuario){
        this.user.subscribe(user=>{
            if(!!usuario.password && !!usuario.username && !!usuario.photoURL){
                user.updateProfile({
                    displayName: usuario.username,
                    photoURL: usuario.photoURL
                }).then(()=>{
                    user.updatePassword(usuario.password);
                    this.toast("Dados alterados com sucesso!");
                }).catch(err=>{
                    this.toast("Erro ao salvar no servidor!")
                });  
            }else{
                if(!!usuario.username){
                    user.updateProfile({
                        displayName: usuario.username,
                        photoURL: usuario.photoURL
                    }).then(()=>{
                        user.reload()
                        this.toast("Nome alterado com sucesso!");
                    }).catch(err=>{
                        this.toast("Erro ao salvar no servidor!")
                    });
                }else{
                    if(!!usuario.password ){
                        if(usuario.password == this.confirmaSenha){
                            if(this.confirmaSenha.length > 5){
                                user.updatePassword(usuario.password).then(()=>{
                                    this.toast("Senha alterada com sucesso!");
                                }).catch(err=>{
                                    console.log(err);
                                    this.toast("Erro ao tentar salvar no servidor!");
                                })
                            }else{
                                this.toast("A senha deve ter mais de 6 dígitos!");
                            }
                        }else{
                            this.toast("Sua senha é diferente da confirmação de senha!");
                        }                    
                    }else{
                        if(!!usuario.photoURL){
                            user.updateProfile({
                                displayName: usuario.username,
                                photoURL: usuario.photoURL
                            }).then(()=>{
                                this.toast("Nome alterado com sucesso!");
                            }).catch(err=>{
                                this.toast("Erro ao salvar no servidor!");
                            });
                        }
                    }
                }
            }
        });
        this.navCtrl.popToRoot()
    }

    toast(mensagem:string){
        this.toastCtrl.create({
            message:mensagem,
            showCloseButton: false,
            duration: 3000
          }).present();
    }

    enableButton(event){
        this.button = false;
        
    }
    disableButton(event){
        if(!event.target.value){

            this.button = true
        }else{
            this.button = false
        }
    }
}