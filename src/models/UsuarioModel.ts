export class Livro{
    nome:string

    constructor(livro:any){
        this.nome = livro.nome
    }
}


export class UsuarioModel{
    email:string;
    password:string;
    sexo:string;
    username:string;
    photoURL:string;
    livros:[Livro];
    lista_desejos:[Livro];
    constructor(usuario: any, livros?:[Livro], lista_desejos?:[Livro]){
        this.email = usuario.email;
        this.password = usuario.password;
        this.sexo = usuario.sexo;
        this.username = usuario.username;
        this.photoURL = usuario.photoURL;
        this.livros = livros;
        this.lista_desejos = lista_desejos;
    }
}
