export class UsuarioModel{
    email:String;
    password:String;
    sexo:String;
    key:String;
    username:String;
    constructor(usuario: any){
        this.email = usuario.email;
        this.key = usuario.key;
        this.password = usuario.password;
        this.sexo = usuario.sexo;
        this.username = usuario.username;
    }
}