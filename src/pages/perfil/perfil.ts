import { Component} from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioModel } from '../../models/UsuarioModel';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app'

@IonicPage()
@Component({
    selector: 'perfil',
    templateUrl: 'perfil.html'
})
export class Perfil{

    public usuario: UsuarioModel;
    user: Observable<firebase.User>;
    constructor(public navCtrl: NavController, public navParams: NavParams){}
}