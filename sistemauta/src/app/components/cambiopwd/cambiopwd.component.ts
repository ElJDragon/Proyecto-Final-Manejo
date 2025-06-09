import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Popper from "popper.js";
import { Cambiopwd } from '../../models/cambiopwd';

@Component({
  selector: 'app-cambiopwd',
  templateUrl: './cambiopwd.component.html',
  styleUrls: ['./cambiopwd.component.css'],
      providers: [UserService]
})
export class CambiopwdComponent {


public page_tittle: string;
public pwd: Cambiopwd;
public status: string ="";
public opcionSeleccionada: string = '';
public campoEntrada: string = '';
public is_edit:boolean=true;
public isigual:boolean=true;
public istemporal:boolean=true;



public token: string ="";
public identity: string ="";

constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute){
  this.page_tittle='Regístrate';
  this.pwd = new Cambiopwd('','', '', '');
  this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
}


  actualizarCampoEntrada() {
if(this.opcionSeleccionada=='')
    {
  this.is_edit=true;
}else
{
  this.is_edit=false;
  }
}

ngOnInit()
{

}


onSubmit(form: any){

  this.pwd['id']=this.identity.sub.toString();
if(this.pwd['Password1']!=this.pwd['Password2'])
{
this.isigual=false;
}
else
{
this.isigual=true;

//este metodo recibe la respuesta y el error
  this._UserService.cambiopwd(this.token, this.pwd).subscribe(
//aqui recibo lo que el api me responde

response => {
console.log(response.status);
if(response.status == 'ERRORPWD')
{
this.status = 'erroremail';
console.log(this.status);
}
if(response.status == 'success')
{
this.status = response.status;
form.reset(); 
  setTimeout(() => {
this.status='';

}, 2000);
}
          },
error =>{

console.log(error.error.status);
    if(error.error.status == 'errorcampos')
  {
this.status='camposrequeridos';
  setTimeout(() => {
this.status='';

}, 2000);
  }

  if(error.error.status == 'erroremail')
  {
    console.log('2');
this.status='erroremail';
  }        

}

    );
}
  
}


}
