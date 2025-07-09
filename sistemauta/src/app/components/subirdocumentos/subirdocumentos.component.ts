import { Component , OnInit,ElementRef, ViewChild, Renderer2   } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TiposDocumentos } from '../../models/TiposDocumentos';
import { DocumentoPersona } from '../../models/DocumentoPersona';
import { UserService } from '../../services/user.service';
import { DocumentosService } from '../../services/documentos.service';
import { global } from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-subirdocumentos',
  templateUrl: './subirdocumentos.component.html',
  styleUrls: ['./subirdocumentos.component.css'],
      providers: [UserService,DocumentosService,ProfileService]
})
export class SubirdocumentosComponent implements OnInit{
imageSrc: string | ArrayBuffer | null = null;
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
public codasignadop:any;
public documentoselec:any;
public IDPER:any;
public datospersona:any;
public urlAdjuntos: string;
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
public guardardocumentos:boolean=false;
 public urlApi: string;
//variables para activar los botones de navegación
public valoradjunto: any;
public uno:boolean=true;
public dos:boolean=false;
public tres:boolean=false;
public dosd:boolean=true;
public tresd:boolean=true;
public atras:boolean=false;
public delante:boolean=true;
public botondocumentos:boolean=false;
public tiposd: TiposDocumentos;
public documentospd: DocumentoPersona;

//codigo para determinar total de espacios en la ultima página
public solo1:boolean=false;
public solo2:boolean=false;
public solo3:boolean=false;
public solo4:boolean=false;
public solo5:boolean=false;
public solo6:boolean=false;
public errorvacio:boolean=false;
public imagen:boolean=false;
public mostrarimagen:boolean=true;
public errorimagen:boolean=true;

public isbusqueda:boolean=false;
public isedicion:boolean=false;
  selectedFile: File | null = null;
@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private http: HttpClient,
             private _documentosService: DocumentosService,
             private _profileService: ProfileService, 
  ){
this.identity=this._UserService.getIdentity();
this.token=this._UserService.getToken();
this.tiposd= new TiposDocumentos('','','');
this.documentospd= new DocumentoPersona('','','','','');
this.urlApi = global.url;
this.urlAdjuntos = global.adjuntos;
  }



  ngOnInit()
{
this.isbusqueda=false;
this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;
this.parametronom.value='';
this.getDatosPersona();
}


//METODO  QUE CONSULTA TODOS LOS REGISTROS PARA
//TIPOS DOCUMENTO
 getTiposDocumentos($persona: any)
  {
    this.paginacion=[];
        this.cuantos=0;
    this._documentosService.getDocumentoAdj($persona).subscribe(
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

  triggerFileInput($documento: any) {
    this.fileInput.nativeElement.click(); // Simula el clic en el input de archivo
    this.documentoselec=$documento;

  }


  onFileChange(event: any) {

    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Establece la URL de datos como src de la imagen
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como URL de datos
      //ya cargo imagen
      this.imagen=true;
      this.botondocumentos=true;
      this.mostrarimagen=false;
      this.errorimagen=false;
    } else {
      this.imageSrc = null; // Oculta la imagen si no hay archivo
    }
  }

getDatosPersona()
  {
this._profileService.getDatosPersona(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{
this.datospersona = response.persona;
for (let personav of this.datospersona)
  {
    this.IDPER=personav.ID;
  }
  this.getTiposDocumentos(this.IDPER);
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


guardarAdjuntos(){

this.documentospd= new DocumentoPersona('',this.documentoselec,'','PDF',this.IDPER);
this._documentosService.guardarAdjunto(this.documentospd).subscribe(
response => {
if(response)
{
this.status= 'success1';
this.codasignadop= response.ASIGNADO;
this.uploadAdjunto(this.codasignadop);
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


uploadAdjunto($nombrearchivo: any) {


    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.post(this.urlApi + 'adjuntos/'+$nombrearchivo+'.', formData).subscribe(
        (response) => {
          console.log('Archivo subido correctamente:', response);
          this.status= 'success';
this.guardardocumentos=true;
this.botondocumentos=false;
  setTimeout(() => {
  this.guardardocumentos=false;  
  this.eventosp=[];
    this.ngOnInit();
  }, 2000);




        },
        (error) => {
          console.error('Error al subir archivo:', error);
        }
      );
    } else {
      console.log('Ningún archivo seleccionado.');
    }
  }



//METODO  QUE CONSULTA TODOS LOS REGISTROS PARA
//TIPOS EVENTO CON UN PARAMETRO
getTiposDocumentosParametros()
{
this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;


if(this.parametronom.value!='')
{

this.getTiposDocumentos1p();
this.isbusqueda=true;
}
else
{
this.getTiposDocumentos(this.IDPER);
this.isbusqueda=false;
}
}  





getTiposDocumentos1p()
  {
    this.paginacion=[];
    this.cuantos=0;
    this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;


if(this.parametronom.value=='')
{
this.parametronomENV=0;
}else{this.parametronomENV=this.parametronom.value;}



    this._documentosService.getDocumento1p(this.parametronomENV.toUpperCase()).subscribe(
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
  this.tiposd= new TiposDocumentos(this.codigomodificar,nombresnuevos.value.toUpperCase(),obsnuevos.value.toUpperCase());
this._documentosService.updateDocumento(this.token,this.tiposd,this.codigomodificar).subscribe(

response => {

if(response)
{
this.status= 'success1';

  this.getTiposDocumentos(this.IDPER);
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


openModal(pdfUrl: string, event: MouseEvent) {
  event.preventDefault();  // Esto evita que el enlace navegue a la página principal
  const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;
  iframe.src = pdfUrl;
  const modal = document.getElementById('pdfModal') as HTMLElement;
  modal.style.display = "block";
}

 closeModal() {
  const modal = document.getElementById('pdfModal') as HTMLElement;
  modal.style.display = "none";
  const iframe = document.getElementById('pdfFrame') as HTMLIFrameElement;
  iframe.src = ""; // Limpiar el src para evitar cargar el PDF cuando el modal está cerrado
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
    console.log(this.IDPER);
  this._documentosService.deleteAdjunto(this.token,this.codigoeliminar,this.IDPER).subscribe(
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
this.eventosp=[];
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
