import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Personas } from '../../models/personas';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
    providers: [UserService]
})
export class UsuariosComponent {


  public token: string ="";
public identity: string ="";
public responsablesp:any;
public status: string ="";
public paginacion: any[]=[];
public cuantos: number = 0;
public totaldepaginas: number = 0;
public registro: number = 0;
public registrototal: number = 0;
public paginaactual: number = 0;
public registrosxpagina: number = 6;
public parametronom:any;
public parametronoa:any;
public parametrodepa:any;
public parametrodepENV:any;
public parametronomENV:any;
public parametronoaENV:any;
public codigoeliminar: string ="";

public codigomodificar:any;
public codigodep:any;
public parametrodep:any;
public depaantes:any;


public ispaginacion:boolean=false;
public istemporal:boolean=true;

//variables para activar los botones de navegación

public uno:boolean=true;
public dos:boolean=false;
public tres:boolean=false;
public dosd:boolean=true;
public tresd:boolean=true;
public atras:boolean=false;
public delante:boolean=true;

public personasmod: Personas;
public usermod: User;

//codigo para determinar total de espacios en la ultima página
public solo1:boolean=false;
public solo2:boolean=false;
public solo3:boolean=false;
public solo4:boolean=false;
public solo5:boolean=false;
public solo6:boolean=false;
public errorvacio:boolean=false;
public errortelefono:boolean=false;

public roles:[{
    name: string;
    value: string;
},
{
    name: string;
    value: string;
}]=[{name:'',value:''},{name:'',value:''}];


public isbusqueda:boolean=false;
public isedicion:boolean=false;



  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
//this.personasmod= new Personas('','','','','','','');
this.usermod= new User(1,'','','','','','');


  this.roles=[
  {
    "name": '1',
    "value": 'ADMINISTRADOR'
  },
  {
    "name": '2',
    "value": 'RESPONSABLE'
  }];

  }





  ngOnInit()
{
this.isbusqueda=false;
  this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;

this.parametronom.value='';
  
  this.getUsuarios();

}


modificarregistro()
{

let nombresnuevos = document.getElementById('nombreedi') as HTMLInputElement | null;
let emailnuevo = document.getElementById('emailedi') as HTMLInputElement | null;

if(nombresnuevos.value=='' || emailnuevo.value=='')
{
  this.errorvacio=true;
}
else{
  this.errorvacio=false;
this.errortelefono=false;

  console.log(this.codigodep);
  if(this.codigodep=='')
{
  this.codigodep=this.depaantes;
}

this.usermod= new User(this.codigomodificar,nombresnuevos.value.toUpperCase(),emailnuevo.value,'','','',this.codigodep);
this._UserService.updateUsuario(this.token,this.usermod,this.codigomodificar).subscribe(

response => {

if(response)
{
this.status= 'success1';

  this.getUsuarios();
  this.isedicion=false;
  this.codigomodificar='';


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


pasarvalor(codigo: any,nombre: any)
{
this.codigodep=nombre;
  this.parametrodep = document.getElementById('departamentoedi') as HTMLInputElement | null;
  this.parametrodep.value=nombre;
}


 Paginacion(pagina: any)
  {
    this.paginacion=[];
    this.registro=0;
    this.cuantos=0;

//ver si hay menos de 3 páginas
    if(this.totaldepaginas>0 && this.totaldepaginas<=2)
    {
     this.tresd=false;
    }
    if(this.totaldepaginas>0 && this.totaldepaginas<=1)
    {
     this.tresd=false;
     this.dosd=false;
    }

//boton siguiente    
if(pagina==4)
    {
      this.atras=true;
      if(this.paginaactual<=this.totaldepaginas-1){
    this.paginaactual++
    }
if(this.paginaactual>=this.totaldepaginas-1){
  this.delante=false;
}
if(this.paginaactual==1)
{
this.uno=false;
this.dos=true;
this.tres=false;
}else
{
  this.uno=false;
this.dos=false;
this.tres=true;
}
    }
    

    if(pagina==0)
    {

      this.delante=true;
      if(this.paginaactual>0){
    this.paginaactual--
    }
if(this.paginaactual==1)
{
this.uno=false;
this.dos=true;
this.tres=false;
}
if(this.paginaactual==0)
{
  this.atras=false;
this.uno=true;
this.dos=false;
this.tres=false;
}
}


    if(pagina==1)
    {
this.delante=true;
this.paginaactual=0;
      if(this.paginaactual>=this.totaldepaginas-1){
  this.delante=false;
}


      this.atras=false;
    
this.uno=true;
this.dos=false;
this.tres=false;



    }
      if(pagina==2)
    {

this.delante=true;
this.paginaactual=1;
      if(this.paginaactual>=this.totaldepaginas-1){
  this.delante=false;
}


      this.atras=true;
     // this.delante=true;
    
    this.uno=false;
this.dos=true;
this.tres=false;

    }
          if(pagina==3)
    {
      this.atras=true;
      this.delante=true;
    this.paginaactual=2;
      if(this.paginaactual>=this.totaldepaginas-1){
  this.delante=false;
}

    this.uno=false;
this.dos=false;
this.tres=true;

    }

    for (let numero of this.responsablesp){
      this.registro++;
        if(this.cuantos<this.registrosxpagina && this.registro>=this.registrosxpagina*this.paginaactual+1)
        {
      this.paginacion[this.cuantos] = numero;
      this.cuantos++;
        }
    }

    //codigo para determinar total de espacios en la ultima página
    if(this.cuantos==1)
    {
this.solo1=true;
this.solo2=false;
this.solo3=false;
this.solo4=false;
this.solo5=false;
this.solo6=false;
    }
        if(this.cuantos==2)
    {
this.solo1=false;
this.solo2=true;
this.solo3=false;
this.solo4=false;
this.solo5=false;
this.solo6=false;
    }
        if(this.cuantos==3)
    {
this.solo1=false;
this.solo2=false;
this.solo3=true;
this.solo4=false;
this.solo5=false;
this.solo6=false;
    }
        if(this.cuantos==4)
    {
this.solo1=false;
this.solo2=false;
this.solo3=false;
this.solo4=true;
this.solo5=false;
this.solo6=false;
    }
        if(this.cuantos==5)
    {
this.solo1=false;
this.solo2=false;
this.solo3=false;
this.solo4=false;
this.solo5=true;
this.solo6=false;
    }
        if(this.cuantos==6)
    {
this.solo1=false;
this.solo2=false;
this.solo3=false;
this.solo4=false;
this.solo5=false;
this.solo6=true;
    }
this.cuantos=0;
  }

 getUsuarios()
  {
    this.paginacion=[];
        this.cuantos=0;
    this._UserService.getAll().subscribe(
response => {
  if(response.status = "success")
{

this.responsablesp = response.user;
console.log(this.responsablesp);
this.registrototal=this.responsablesp.length;
this.totaldepaginas=this.responsablesp.length/this.registrosxpagina;
if(this.registrototal>this.registrosxpagina)
{
this.ispaginacion=true;
}
else
{
 this.ispaginacion=false; 
}

for (let numero of this.responsablesp){
       if(this.registrototal>=this.registrosxpagina)
{
        if(this.cuantos<this.registrosxpagina)
        {
      this.paginacion[this.cuantos] = numero;
      this.cuantos++;
        }else{
          break;}
}else
{
        if(this.cuantos<this.responsablesp.length)
        {
      this.paginacion[this.cuantos] = numero;
      this.cuantos++;
        }
}
                                    }

  this.paginaactual=1;
  this.Paginacion(0);
}else
{
this.status='error1';
}
},
error=>{
this.status='error1';
console.log(<any>error);
}
      );
  }




getResponsablesParametros()
{

this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;



if(this.parametronom.value!='')
{

this.getResponsables1p();
this.isbusqueda=true;
}
else
{
this.getUsuarios();
this.isbusqueda=false;
}
}  





getResponsables1p()
  {

    this.paginacion=[];
    this.cuantos=0;
    this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;
    

if(this.parametronom.value=='')
{
this.parametronomENV=0;
}else{this.parametronomENV=this.parametronom.value;}


    this._UserService.getUsuario1p(this.parametronomENV).subscribe(
response => {
  if(response.status = "success")
{

this.responsablesp = response.user;
console.log(this.responsablesp);
this.registrototal=this.responsablesp.length;
this.totaldepaginas=this.responsablesp.length/this.registrosxpagina;
if(this.registrototal>this.registrosxpagina)
{
this.ispaginacion=true;
}
else
{
 this.ispaginacion=false; 
}
for (let numero of this.responsablesp){
       if(this.registrototal>=this.registrosxpagina)
{
        if(this.cuantos<this.registrosxpagina)
        {
      this.paginacion[this.cuantos] = numero;
      this.cuantos++;
        }else{
          break;}
}else
{
        if(this.cuantos<this.responsablesp.length)
        {
      this.paginacion[this.cuantos] = numero;
      this.cuantos++;
        }
}
                                    }
                                      this.paginaactual=1;
  this.Paginacion(0);
}else
{
this.status='error2';
}
},
error=>{
this.status='error2';
console.log(<any>error);
}
      );
  }


codigoUsuario(codigo: any)
  {
    this.codigoeliminar=codigo;
  }


   eliminarUsuario(){
  this._UserService.deleteUsuario(this.token,this.codigoeliminar).subscribe(
//aqui recibo lo que el api me responde

response => {
if(response.status = "success")
{
  this.istemporal=true;
this.status = response.status;
const index = this.paginacion.findIndex(responsable => responsable.id === this.codigoeliminar);
  if (index !== -1) {
      this.paginacion.splice(index, 1);
    }


  setTimeout(() => {
this.istemporal=false;
    this.ngOnInit();
}, 3000);

}else
{
  this.istemporal=true;
this.status='error';
}
          },
error =>{
  this.istemporal=true;
this.status='error';
  console.log(<any>error);}          

    );
}

cancelar()
{
  this.isedicion=false;
  this.codigomodificar='';
this.errorvacio=false;
this.errortelefono=false;

}

actualizar(codigores: any, role: any)
{
  this.codigomodificar=codigores;
  this.isedicion=true;
  this.depaantes=role;
}


}
