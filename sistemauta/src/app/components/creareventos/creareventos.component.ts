import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventosService } from '../../services/eventos.service';
import { TiposEventos } from '../../models/TiposEventos';


@Component({
  selector: 'app-creareventos',
  templateUrl: './creareventos.component.html',
  styleUrls: ['./creareventos.component.css'],
        providers: [UserService,EventosService]
})
export class CreareventosComponent {



public token: string ="";
public identity: string ="";
public departamentosp:any;
public status: string ="";
public parametrodep:any;

public parametroobs:any;
public parametrotelefono:any;
public parametronombre:any;
public codigodep:any;
public eventosd: TiposEventos;
public guardar:boolean=false;
public telefono:boolean=false;

  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private _eventosService: EventosService
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.eventosd= new TiposEventos('','','');

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
  this.eventosd= new TiposEventos('',this.parametronombre.value,this.parametroobs.value.toUpperCase());
this._eventosService.guardarEvento(this.eventosd).subscribe(
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
