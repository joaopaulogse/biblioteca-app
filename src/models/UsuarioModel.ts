export class UsuarioModel{
    email:string;
    password:string;
    sexo:string;
    username:string;
    constructor(usuario: any){
        this.email = usuario.email;
        this.password = usuario.password;
        this.sexo = usuario.sexo;
        this.username = usuario.username;
    }
}