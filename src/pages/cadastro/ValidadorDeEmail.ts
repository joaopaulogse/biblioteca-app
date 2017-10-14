import {AbstractControl} from '@angular/forms'

export class ValidadorDeEmail{
    
    static validador(control: AbstractControl): ValidateResult {
        let email_regex = /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;        
        if(control.value != ""  && !email_regex.test(control.value)){
            return {"incorrectFormatoDeEmail": true};            
        }else{
            return {"correctFormatoDeEmail": false};
            
        }
       
    }
}

interface ValidateResult{
    [key: string]:boolean;
}