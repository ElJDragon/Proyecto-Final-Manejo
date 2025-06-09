import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Popper from "popper.js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent {
public page_tittle: string;
public user: User;
public status: string ="";
public opcionSeleccionada: string = '';
public campoEntrada: string = '';
public is_edit:boolean=true;
public isigual:boolean=true;
public istemporal:boolean=true;

public bandera:boolean=true;

public token: string ="";
public identity: string ="";

constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute){
  this.page_tittle='Regístrate';
  this.user = new User(1,'', '', '', '', '', '');
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

reloadPage() {
  this._router.navigate(['/login']).then(() => {
    window.location.reload();
  });
}

ngOnInit()
{

  this.logout();
}
//registro
onSubmit(form: any){
  this.user['role']='ADMINISTRADOR';
if(this.user['Password']!=this.user['Password2'])
{
this.isigual=false;
}
else
{
this.isigual=true;

//este metodo recibe la respuesta y el error
  this._UserService.register(this.user).subscribe(
//aqui recibo lo que el api me responde

response => {

if(response.status = "success")
{
this.status = response.status;
form.reset(); 
  setTimeout(() => {
this.status='';

}, 2000);


}
          },
error =>{


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



onSubmit2(form: any){

//esto me devuelve toda la informacion del usuario legeado
  //this._UserService.signup(this.user,true).subscribe(
//esto me devuelve el token
this._UserService.signup(this.user,null).subscribe(

 
 //aqui recibo lo que el api me responde
response => {
if(response.status != 'error')
{
this.status = response.status;
this.token = response;

//SACAR EL OBJETO DEL USUARIO IDENTIFICADO
                this._UserService.signup(this.user,true).subscribe(
                 //aqui recibo lo que el api me responde
                response => {
                this.identity = response;
                //PERSISTIR DATOS DE USUARIO IDENTIFICADO
                localStorage.setItem('token',this.token);
                localStorage.setItem('identity',JSON.stringify(this.identity));
                //redirecciono a la pagina de inicio
                this._router.navigate(['']);
               
                
                  setTimeout(() => {
window.location.reload();
}, 2000);
                          },
                error =>{
                this.status='error';
                  console.log(<any>error);}  
                  );
//SACAR EL OBJETO DEL USUARIO IDENTIFICADO

//form.reset(); 
}else
{
this.status='errorinicio';
  setTimeout(() => {
this.status='';

}, 2000);
}
          },
error =>{
  console.log(error.message.message);
this.status='errorinicio';
  setTimeout(() => {
this.status='';

}, 2000);
  console.log(<any>error.message);}  

  );

  }


  logout()
  {
  this._route.params.subscribe(params=>{
    let logout = +params['sure'];
    if(logout == 1)
    {
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this.identity='';
      this.token='';
      //redirecciono a la pagina de inicio
      this._router.navigate(['login']);


    }
  }

    )
  }
}
