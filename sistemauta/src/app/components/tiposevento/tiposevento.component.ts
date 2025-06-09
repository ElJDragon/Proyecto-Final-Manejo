import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TiposEventos } from '../../models/TiposEventos';
import { UserService } from '../../services/user.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-tiposevento',
  templateUrl: './tiposevento.component.html',
  styleUrls: ['./tiposevento.component.css'],
  providers: [UserService,EventosService]
})
export class TiposeventoComponent {
public token: string ="";
public identity: string ="";
public eventosp:any;
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

public tiposd: TiposEventos;
//codigo para determinar total de espacios en la ultima página
public solo1:boolean=false;
public solo2:boolean=false;
public solo3:boolean=false;
public solo4:boolean=false;
public solo5:boolean=false;
public solo6:boolean=false;
public errorvacio:boolean=false;


public isbusqueda:boolean=false;
public isedicion:boolean=false;

  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
             private _eventoService: EventosService
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.tiposd= new TiposEventos('','','');

  }



  ngOnInit()
{
this.isbusqueda=false;
this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;
this.parametronom.value='';
this.getTiposEventos();
}


//METODO  QUE CONSULTA TODOS LOS REGISTROS PARA
//TIPOS EVENTO
 getTiposEventos()
  {
    this.paginacion=[];
        this.cuantos=0;
    this._eventoService.getEvento().subscribe(
response => {
  if(response.status = "success")
{

this.eventosp = response.tipos;
console.log(this.eventosp);
this.registrototal=this.eventosp.length;
this.totaldepaginas=this.eventosp.length/this.registrosxpagina;
if(this.registrototal>this.registrosxpagina)
{
this.ispaginacion=true;
}
else
{
 this.ispaginacion=false; 
}

for (let numero of this.eventosp){
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
        if(this.cuantos<this.eventosp.length)
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
console.log(error.message);
console.log(<any>error);
}
      );
  }






//METODO  QUE CONSULTA TODOS LOS REGISTROS PARA
//TIPOS EVENTO CON UN PARAMETRO
getTiposEventosParametros()
{
this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;


if(this.parametronom.value!='')
{

this.getTiposEventos1p();
this.isbusqueda=true;
}
else
{
this.getTiposEventos();
this.isbusqueda=false;
}
}  





getTiposEventos1p()
  {
    this.paginacion=[];
    this.cuantos=0;
    this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;


if(this.parametronom.value=='')
{
this.parametronomENV=0;
}else{this.parametronomENV=this.parametronom.value;}



    this._eventoService.getEvento1p(this.parametronomENV.toUpperCase()).subscribe(
response => {
  if(response.status = "success")
{

this.eventosp = response.tipos;
console.log(this.eventosp);
this.registrototal=this.eventosp.length;
this.totaldepaginas=this.eventosp.length/this.registrosxpagina;
console.log('cuantos'+this.registrototal);
if(this.registrototal>this.registrosxpagina)
{
this.ispaginacion=true;
}
else
{
 this.ispaginacion=false; 
}
for (let numero of this.eventosp){
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
        if(this.cuantos<this.eventosp.length)
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





modificarregistro()
{
let nombresnuevos = document.getElementById('nombreedi') as HTMLInputElement | null;
let obsnuevos = document.getElementById('detalleedi') as HTMLInputElement | null;
if(this.codigodep=='')
{
  this.codigodep=this.depaantes;
}
if(nombresnuevos.value=='')
{
  this.errorvacio=true;
}else
{
this.errorvacio=false;
  this.tiposd= new TiposEventos(this.codigomodificar,nombresnuevos.value.toUpperCase(),obsnuevos.value.toUpperCase());
this._eventoService.updateEvento(this.token,this.tiposd,this.codigomodificar).subscribe(

response => {

if(response)
{
this.status= 'success1';

  this.getTiposEventos();
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





//METODO  QUE ELIMINA EL REGISTROS PARA
//TIPOS EVENTO CON UN PARAMETRO
codigoEvento(codigo: any)
  {
    this.codigoeliminar=codigo;
  }


   eliminarEvento(){
//este metodo recibe la respuesta y el error
    console.log(this.codigoeliminar);
  this._eventoService.deleteEvento(this.token,this.codigoeliminar).subscribe(
//aqui recibo lo que el api me responde

response => {
if(response.status = "success")
{
  this.istemporal=true;
this.status = response.status;
const index = this.paginacion.findIndex(responsable => responsable.ID === this.codigoeliminar);
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

}

actualizar(codigores : any,codigodep : any)
{
  this.codigomodificar=codigores;
  this.isedicion=true;
  this.depaantes=codigodep;
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

    for (let numero of this.eventosp){
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
}
