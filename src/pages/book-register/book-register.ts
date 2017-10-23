import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the BookRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-register',
  templateUrl: 'book-register.html',
  providers:[DatabaseProvider]
})
export class BookRegisterPage {
  imageBase64: string;

  user: Observable<firebase.User>;
  livro = {};
  foto:any;
  foto_existente:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public authFB:AngularFireAuth,
    public db:DatabaseProvider
  ) {
    this.user = authFB.authState;//this.navParams.get("user")//usuario da home
    this.livro = !!this.navParams.get("livro") ? this.navParams.get("livro").volumeInfo:{}; //livro que o usuário escolhe na bookSearch
  }

  //public book:string = this.livro.title
  ionViewDidLoad() {
    console.log(this.livro);
  }
  
  registerBook(livro, event){
    event.preventDefault();
    console.log(livro)
    console.log(event)
    const {title, authors, description, categories, pageCount, publisher, publishedDate, read, industryIdentifiers, imageLinks } = livro;
    if(!!this.foto){
      this.toBase64(this.foto).then(foto=>{
        this.imageBase64 = foto.toString()
      }).catch(err=>console.log(`nao foi possivel converter a foto: ${err}`))
    }
    try{
      const book = {
        title: !!title ? title:"", 
        authors: !!authors ? authors:[], 
        description: !!description ? description:"", 
        categories: !!categories ? categories: "", 
        pageCount: !!pageCount ? pageCount: 0, 
        publisher: !!publisher ? publisher: "", 
        publishedDate: !!publishedDate ? publishedDate: "", 
        read: !!read ? read: false,
        // isbn_10:!!industryIdentifiers[1]?industryIdentifiers[1].identifier:"",
        // isbn_13:!!industryIdentifiers[0]?industryIdentifiers[0].identifier:"",
        image:!!imageLinks?imageLinks.thumbnail || imageLinks.smallThumbnail || this.imageBase64:""
      };
      console.log(book);
      console.log("Livro",this.livro)
      this.user.subscribe(user=>{
        this.db.registerBookInUser(user.uid, book).then(obj=>{
          this.navCtrl.setRoot(HomePage);
          console.log(obj);
        });
      });
    }catch(erro){
      console.log(erro)
    }
    
  }

  public cancelRegister(event){
    event.preventDefault();
    this.alertCtrl.create({
      title: "Do you want to cancel?",
      message: "If you cancel, your changes will be lost.",
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    }).present();
  }
  enviaImage(event){
    if(event.target.files[0]){
      this.foto = event.target.files[0];
      (<HTMLImageElement>document.querySelector('#imageCadastro')).src = URL.createObjectURL(event.target.files[0]);

    }
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
