import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
         providers: [UserService]
})
export class ReporteComponent {

ExcelData:any;
public is_edit:boolean=true;
  public token: string ="";
public identity: string ="";
public departamentosp:any;
public status: string ="";
public parametrodep:any;
public parametrosp:any;
public procesadosp:any;
public parametrocodigo:any;
public fechaexponer:any;
public parametronombre:any;
public errorvacio:boolean=false;
public codigodep:any;
public guardar:boolean=false;
public telefono:boolean=false;
public istemporal:boolean=true;
  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();

  }


    ngOnInit()
{

}



}
