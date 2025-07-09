import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarrerasService } from '../../services/carreras.service';
import { Carreras } from '../../models/carreras';
 import { global } from '../../services/global';
import { CursosService } from '../../services/cursos.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css'],
        providers: [UserService,CarrerasService,CursosService,ProfileService]
})
export class CalificacionComponent {



public token: string ="";
public identity: string ="";
public departamentosp:any;
public status: string ="";
public parametrodep:any;
public cursosp:any;
public parametroobs:any;
public parametrotelefono:any;
public parametronombre:any;
public codigodep:any;
public datospersona:any;
public CODREGISTRO:any;

public carrerasd: Carreras;
public guardar:boolean=false;
public telefono:boolean=false;
public parametro:any;
public primerParametro:any;
public parametro2:any;
public segundoParametro:any;
public urlStorage: string;
   public urlApi: string;

  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private _cursosService: CursosService,
            private _carrerasService: CarrerasService,
            private _profileService: ProfileService,
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.carrerasd= new Carreras('','','');
 this.urlStorage = global.storage;
  this.urlApi = global.url;
  }



  ngOnInit()
{
    this.parametro=this._route.snapshot.params;
this.primerParametro = this.parametro.parametro;
this.parametro2=this._route.snapshot.params;
this.segundoParametro = this.parametro2.parametro2;
this.getEventosActivos(this.primerParametro);
this.getCursoRegistrado(this.primerParametro,this.segundoParametro)
}




getCursoRegistrado($parametro:any , $parametrodos: any)
  {

this._profileService.getPersonaRegistro($parametro,$parametrodos).subscribe(
response => {
  if(response.status = "success")
{
this.datospersona = response.persona;
for (let personav of this.datospersona)
  {
    this.CODREGISTRO=personav.CODIGO;
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


aprobarMODEL()
{

this._cursosService.updateAprobar(this.token,this.CODREGISTRO).subscribe(

response => {

if(response)
{
this.status= 'success';
  setTimeout(() => {
this.status= '';
}, 3000);
}else
{
this.status='error1';
}
          },
error =>{
this.status='error1';

console.log(<any>error);}          

  );


}



reprobarMODEL()
{

this._cursosService.updateReprobar(this.token,this.CODREGISTRO).subscribe(

response => {

if(response)
{
this.status= 'success';
  setTimeout(() => {
this.status= '';
}, 3000);
}else
{
this.status='error1';
}
          },
error =>{
this.status='error1';

console.log(<any>error);}          

  );


}

  getEventosActivos(parametro: any) {

    
    this._cursosService.getEventosCodigo(parametro).subscribe(
      response => {
        if (response.status == "success") {
          this.cursosp = response.cursos;
          console.log(this.cursosp);

        } else {
          this.status = 'error1';
        }
      },
      error => {
        this.status = 'error1';
        console.log(<any>error);
      }
    );
  }


}
