import { Component} from '@angular/core'
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { UsuarioModel } from '../../models/UsuarioModel';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'

@IonicPage()
@Component({
    selector: 'perfil',
    templateUrl: 'perfil.html',
    providers:[DatabaseProvider]
})
export class Perfil{

    visivel: boolean = false;
    user: Observable<firebase.User>;
    usuario:UsuarioModel;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public db:DatabaseProvider,
        public autFB:AngularFireAuth,
        public toastCtrl:ToastController
    ){
        this.user = autFB.authState;
        this.user.subscribe(user=>{
            this.db.regiterUserInDatabase(user);
            this.usuario = new UsuarioModel(user);
            this.usuario.username = user.displayName;
            this.usuario.photoURL = user.photoURL; 
        });
    }

    alterarDados(){
        this.user.subscribe(user=>{
            user.updatePassword(this.usuario.password);
            user.updateProfile
            this.navCtrl.setRoot(Perfil); 
            this.toast();       
        });
    }
    toast(){
        this.toastCtrl.create({
            message:"Senha alterada com sucesso.",
            showCloseButton: false,
            duration: 3000
          }).present();
    }
}