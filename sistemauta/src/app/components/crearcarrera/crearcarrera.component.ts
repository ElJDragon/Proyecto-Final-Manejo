import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarrerasService } from '../../services/carreras.service';
import { Carreras } from '../../models/carreras';

@Component({
  selector: 'app-crearcarrera',
  templateUrl: './crearcarrera.component.html',
  styleUrls: ['./crearcarrera.component.css'],
      providers: [UserService,CarrerasService]
})
export class CrearcarreraComponent {


public token: string ="";
public identity: string ="";
public departamentosp:any;
public status: string ="";
public parametrodep:any;

public parametroobs:any;
public parametrotelefono:any;
public parametronombre:any;
public codigodep:any;
public carrerasd: Carreras;
public guardar:boolean=false;
public telefono:boolean=false;

  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private _carrerasService: CarrerasService
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.carrerasd= new Carreras('','','');

  }



  ngOnInit()
{
  

}




guardarCarrera(){

    this.parametronombre = document.getElementById('nombrep') as HTMLInputElement | null;
    this.parametroobs = document.getElementById('obsp') as HTMLInputElement | null;


    if(this.parametronombre.value=='')
    {
      this.guardar=true;  
    }
    else 
    {
       if(this.parametroobs.value=='')
    {
      this.guardar=true;  
    }
    else
    {
            this.guardar=false;  
  this.carrerasd= new Carreras('',this.parametronombre.value,this.parametroobs.value.toUpperCase());
this._carrerasService.guardarCarrera(this.carrerasd).subscribe(
response => {
if(response)
{
this.status= 'success';
}else
{
this.status='error';
}
          },
error =>{
this.status='error';
console.log(<any>error);}          

  );
    

  }

    
    
    
    }
}

}
