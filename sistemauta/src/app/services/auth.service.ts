// auth.service.ts
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Implementa lógica para verificar roles aquí

      public token: string ="";
public identity: string ="";
public bool:boolean=false;
public responsablesp:any;
public status: string ="";
public role: string ="";

   constructor(private serService: UserService) {

    this.identity=this.serService.getIdentity();
this.token=this.serService.getToken();
 this.bool=false;
  }




  isAdmin(rol: any): boolean {

       
    this.serService.getUserid(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{

this.responsablesp = response.user;
   for (let numero of this.responsablesp){
    this.role=numero.role;
}


if(this.role==rol)
{
  this.bool=true;
}else
{
  this.bool=false;
  }



}else
{
this.status='errorroles';
  this.bool=false;
}
},
error=>{
this.status='errorroles';
  this.bool=false;
}
      );

    return this.bool;
  }

}
