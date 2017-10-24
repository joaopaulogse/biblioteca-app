import { Component} from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { UsuarioModel } from '../../models/UsuarioModel';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'

@IonicPage()
@Component({
    selector: 'perfil',
    templateUrl: 'perfil.html'
})
export class Perfil{

    visivel: boolean = false;
    user: Observable<firebase.User>;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public db:DatabaseProvider,
        public autFB:AngularFireAuth
    ){
        this.user = autFB.authState;
    }

    public chamarSenha():void{
        this.visivel = !this.visivel;
    }
}