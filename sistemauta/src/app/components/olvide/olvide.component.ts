import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Popper from "popper.js";
import { Mail } from '../../models/mail';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.component.html',
  styleUrls: ['./olvide.component.css'],
      providers: [UserService]
})
export class OlvideComponent {


public page_tittle: string;
public user: User;
public status: string ="";
public opcionSeleccionada: string = '';
public campoEntrada: string = '';
public is_edit:boolean=true;
public isigual:boolean=true;
public istemporal:boolean=true;

///////////////////////////////////////////
////////////MAIL/////////////
////////////////////////////////////////////
public responsablepa:any;
public personasp:any;
public tipocorreop:any;
public destino: string ="";
public telefonodestino: string ="";
public asunto: string ="";
public cuerpo: string ="";
public mailp: Mail;

///////////////////////////////////////////
////////////MAIL/////////////
////////////////////////////////////////////

public token: string ="";
public identity: string ="";

constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute){
  this.page_tittle='Regístrate';
  this.user = new User(1,'', '', '', '', '', '');
  this.mailp= new Mail('','','','');
}



ngOnInit()
{

}


onSubmit(form: any){


console.log(this.mailp);

this._UserService.recuperarContraseña(this.mailp).subscribe(
response => {
if(response)
{
 if(response.mensaje=='NOEXISTE')
 {
this.status= 'noexiste';
 }
 else
 {
this.status= 'success';  
 }

}else
{
this.status='error';
}
          },
error =>{
this.status='error';
console.log(error);
}          

  ); 


}


}
