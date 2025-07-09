import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DocumentosService } from '../../services/documentos.service';
import { TiposDocumentos } from '../../models/TiposDocumentos';


@Component({
  selector: 'app-creadocumentos',
  templateUrl: './creadocumentos.component.html',
  styleUrls: ['./creadocumentos.component.css'],
          providers: [UserService,DocumentosService]
})
export class CreadocumentosComponent {




public token: string ="";
public identity: string ="";
public departamentosp:any;
public status: string ="";
public parametrodep:any;
public eventosd:any;

public parametroobs:any;
public parametrotelefono:any;
public parametronombre:any;
public codigodep:any;
public tiposd: TiposDocumentos;
public guardar:boolean=false;
public telefono:boolean=false;

  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private _documentosService: DocumentosService
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.eventosd= new TiposDocumentos('','','');

  }



  ngOnInit()
{
  

}




guardarDocumentos(){

    this.parametronombre = document.getElementById('nombrep') as HTMLInputElement | null;
    this.parametroobs = document.getElementById('obsp') as HTMLInputElement | null;



       if(this.parametronombre.value=='')
    {
      this.guardar=true;  
    }
    else
    {
            this.guardar=false;  
  this.eventosd= new TiposDocumentos('',this.parametronombre.value,'PDF');
this._documentosService.guardarDocumento(this.eventosd).subscribe(
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
