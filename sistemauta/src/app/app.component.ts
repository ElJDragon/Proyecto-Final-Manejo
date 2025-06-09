import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'sistema-angular';
  public identity:any;
  public token:any;
  public status: string ="";
  public Rol: string ="";
  public principio:any;
  public valoresp:any;
    public is_login:boolean=false;
  public is_admin:boolean=false;
   public is_alerta:boolean=true;
public departamentosp:any;

  constructor(public _UserService: UserService)
  {
  this.loadUser();
  this.is_login=false;
  this.is_admin=false;
  this.identity = this._UserService.getIdentity();
  this.token = this._UserService.getToken();
  }

  ngOnInit()
  {
    this.getUsuarios();
  }

  cambiarestado()
  {
    this.is_login=false;
   this.is_admin=false;
  }


  //metodo que se ejecuta cada vez que ocurra algo
  ngDoCheck()
  {
this.loadUser();
  }

  loadUser()
  {
this.identity = this._UserService.getIdentity();
this.token = this._UserService.getToken();
  }





 getUsuarios()
  {

this._UserService.getrole(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{
this.valoresp = response.user;
this.Rol=this.valoresp.role;

if(this.Rol=='ADMINISTRADOR')
{
this.is_admin=true;
this.is_login=true;
}else
{
this.is_admin=false;
this.is_login=true;
}
}else
{
this.status='error';
}
},
error=>{
this.status='error';
console.log(<any>error);
}
      );
  }

}
