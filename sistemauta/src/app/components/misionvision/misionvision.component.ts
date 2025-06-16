import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Misionvision } from '../../models/misionvision';
import { MisionService } from '../../services/mision.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-misionvision',
  templateUrl: './misionvision.component.html',
  styleUrls: ['./misionvision.component.css'],
         providers: [UserService,MisionService]
})
export class MisionvisionComponent {



ExcelData:any;
public is_edit:boolean=true;
  public token: string ="";
public identity: string ="";
public status: string ="";
public parametrodep:any;
public parametrosp:any;
public misionp:any;
public parawhatp:any;
public parametrocodigo:any;
public parametronombre:any;
public errorvacio:boolean=false;
public codigodep:any;
  public editpersona:boolean=false;
    public editwhat:boolean=false;
public guardar:boolean=false;
public telefono:boolean=false;
public istemporal:boolean=true;

public misionvision: Misionvision;

  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private _misionvisionService: MisionService
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.misionvision= new Misionvision('','','');
  }


    ngOnInit()
{
  this.getMision();

  
}

  getMision() {
    this._misionvisionService.getMision().subscribe(
      response => {
        if (response.status == "OK") {
          this.misionp = response.tipos;
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




editarPersona()
{
  this.editpersona=true;
  
}
cancelPersona()
{
  this.editpersona=false;
}

modificarregistro($mision :any, $vision :any)
{
if($mision=='' || $vision=='' )
{
  this.errorvacio=true;
}

else{

  this.errorvacio=false;


this.misionvision= new Misionvision('COD1',$mision.toUpperCase(),$vision.toUpperCase());

this._misionvisionService.updateMision(this.token,this.misionvision,'COD1').subscribe(

response => {

if(response)
{
this.status= 'success';
  this.getMision();
this.editpersona=false;

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
}

}
