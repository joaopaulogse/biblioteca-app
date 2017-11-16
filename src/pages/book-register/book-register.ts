import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';
import { WishListPage } from '../wish-list/wish-list';
import { StorageProvider } from '../../providers/storage/storage';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';


@IonicPage()
@Component({
  selector: 'page-book-register',
  templateUrl: 'book-register.html',
  providers:[DatabaseProvider, UtilsProvider, StorageProvider, DocumentViewer]
})
export class BookRegisterPage {
  pdf: any;
  imageBase64: string;
  pdfBase64: string;
  pdfBase64Book:any;
  user: Observable<firebase.User>;
  livro = {};
  foto:any;
  foto_existente:any;
  edit:boolean = false;
  input:boolean = true;
  key:any
  desejo:boolean = false;
  inferior:boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public authFB:AngularFireAuth,
    public db:DatabaseProvider,
    public utils:UtilsProvider,
    public toast:ToastController,
    public actionSheetCtrl: ActionSheetController,
    public storage:StorageProvider,
    public document: DocumentViewer
  ) {
    this.user = authFB.authState;//this.navParams.get("user")//usuario da home
    this.livro = !!this.navParams.get("livro") ? this.navParams.get("livro").volumeInfo:{};
    this.key = !!this.navParams.get("book")?this.navParams.get("book").key:"";
    this.pdfBase64Book = !!this.navParams.get("livro")?this.navParams.get("livro").volumeInfo.pdf:"";
    this.edit = this.navParams.get("edit");//negado por que ele vem true
    this.desejo = this.navParams.data.desejo;
    // console.log(this.pdfBase64Book)
    // console.log(this.livro)
    // console.log(this.navParams.get('book'))
    if(!this.edit){
      this.input = false;
    }
  }

  async registerBook(livro, event){
    event.preventDefault();
    console.log(livro)
    console.log(event)
    const {title, authors, description, categories, pageCount, publisher, publishedDate, read, industryIdentifiers, imageLinks, isbn } = livro;
    if(!!this.foto){
      await this.utils.toBase64(this.foto).then(foto=>{
        this.imageBase64 = foto.toString()
      }).catch(err=>console.log(`nao foi possivel converter a foto: ${err}`))
    }
    if(this.pdf){
      await this.utils.toBase64(this.pdf).then(pdf=>{
        this.pdfBase64 = pdf.toString()
      }).catch(err=>{
        console.log("Erro no pdf: ", err)
      })
    }
    if(!!!title){
      this.messagemToast("Título é obrigatório!");
      }else{    
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
          isbn_10:!!industryIdentifiers && !!industryIdentifiers[1]?industryIdentifiers[1].identifier:"",
          isbn_13:(!!industryIdentifiers && !!industryIdentifiers[0]) || !!isbn?industryIdentifiers[0].identifier || isbn:"",
          image:!!imageLinks?this.imageBase64 || imageLinks.thumbnail || imageLinks.smallThumbnail:"",
          pdf:!!this.pdfBase64?this.pdfBase64:""
        };
      
        console.log(book);
        console.log("Livro",this.livro)
        await this.user.subscribe(user=>{
          console.log(this.pdf)
          
          this.db.registerBookInUser(user.uid, book).then(obj=>{ 
            this.navCtrl.setRoot(HomePage);
            console.log(obj);
          });
        });
      }catch(erro){
        this.messagemToast('Não foi possível adicionar esse livro, verifique se os campos estão preenchidos corretamente!');
        console.log(erro)
      }
    }
  }
  enviaPDF(event){
    let file = event.target.files[0];
    if(!!file && file.name.endsWith('.pdf')){
      this.pdf = file;
    }else{
      this.messagemToast('Isso não é um PDF!');
    }
  }
  /*Habilitar formulário*/
  enableInputs(){
    this.input = false;
  }
  public cancelRegister(){
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
  async alterar(book, key){
    if(!!this.foto){
      await this.utils.toBase64(this.foto).then(foto=>{
        book.image = foto.toString()
      }).catch(err=>console.log(`nao foi possivel converter a foto: ${err}`))
    }
    if(!!!book.title){
      this.messagemToast("Título é obrigatório!");
    }else{
      this.user.subscribe(user=>{
        this.db.alterarLivro(user.uid, key, book)
        .then(()=>{
        this.messagemToast('Livro alterado!')
        this.navCtrl.setRoot(HomePage)
        })
        .catch(err=>{
          this.messagemToast('Livro não alterado!')
          console.log(err);
        })
      })
    }
  }
  messagemToast(message:string){
    this.toast.create({
      message:message,
      duration:3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    }).present();
  }
  close(){
    if(!this.input){
      this.cancelRegister();
    }else{
      this.viewCtrl.dismiss()
    }
  }
  excluirLivro(){
    this.user.subscribe(user=>{
      if(!!this.key){
        this.db.excluirLivro(user.uid, this.key)
          .then(()=>{
            this.messagemToast("Livro Excluido com Sucesso!");
            this.navCtrl.setRoot(HomePage);
          })
          .catch(err=>{
            this.messagemToast("Opa, Livro não excluido!");
            console.log(err)
          })
      }else{
        this.messagemToast('Não sei que livro é esse!');
      }
    })
  }
  excluirLivroDesejo(){
      this.user.subscribe(user=>{
        if(!!this.key){
          this.db.excluirLivroListaDesejo(user.uid, this.key)
            .then(()=>{
              if(this.inferior==false){
                this.messagemToast("Livro Excluido com Sucesso!");
                this.navCtrl.setRoot(HomePage);
              } else{
                this.messagemToast("Livro movido com Sucesso!");
                //this.navCtrl.push(WishListPage);
              }             
            })
            .catch(err=>{
              this.messagemToast("Opa, Livro não excluido!");
              console.log(err)
            })
        }else{
          this.messagemToast('Não sei que livro é esse!');
        }
      })
  }
  
  /* Abre modal para habilitar edição ou exclusão de livro*/
  options(){
    if(!this.desejo){
    this.actionSheetCtrl.create({
      title:"Opções",
      buttons:[
        {
          text:"Editar livro",
          handler:()=>{
            this.enableInputs()
          }
        },
        {
          text:"Excluir livro",
          handler:()=>{
            this.alertCtrl.create({
              title: "Excluir livro",
              message: "Deseja realmente excluir esse livro?",
              buttons: [
                {
                  text: "Não",
                  role:'cancel'
                },
                {
                  text: "Sim",
                  handler: () => {
                    this.excluirLivro()
                  }
                }
              ]
            }).present();
          }
        },
        {
          text: "Abrir PDF",
          handler:()=>{
            const options: DocumentViewerOptions = {
              title: 'My PDF'
            }
            // this.user.subscribe(user=>{

              // this.db.getBooksInTheUser
            // })
            this.document.viewDocument(this.pdfBase64Book, 'application/pdf', options)
          }
        },
        {
         text: 'Cancelar',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
      ]
    }).present()
    }else{
      this.actionSheetCtrl.create({
        title:"Opções",
        buttons:[
          {
            text:"Adicionar a biblioteca",
            handler:()=>{
              this.inferior=true;
              this.registerBook(this.livro, event);
              this.excluirLivroDesejo();
            }
          },
          {
            text:"Excluir Livro",
            handler:()=>{
              this.alertCtrl.create({
                title: "Deseja realmente excluir esse livro?",
                buttons: [
                  {
                    text: "Não",
                    role:'cancel'
                  },
                  {
                    text: "Sim",
                    handler: () => {
                      this.excluirLivroDesejo();
                    }
                  }
                ]
              }).present();
            }
          },
          {
           text: 'Cancelar',
           role: 'cancel',
           handler: () => {
             console.log('Cancel clicked');
           }
         }
        ]
      }).present()
    }
  }
}
