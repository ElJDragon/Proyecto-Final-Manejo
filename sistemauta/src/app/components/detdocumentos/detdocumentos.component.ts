import { Component , OnInit,ElementRef, ViewChild, Renderer2   } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TiposDocumentos } from '../../models/TiposDocumentos';
import { DocumentoPersona } from '../../models/DocumentoPersona';
import { UserService } from '../../services/user.service';
import { DocumentosService } from '../../services/documentos.service';
import { global } from '../../services/global';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-detdocumentos',
  templateUrl: './detdocumentos.component.html',
  styleUrls: ['./detdocumentos.component.css'],
        providers: [UserService,DocumentosService,ProfileService,CursosService]
})
export class DetdocumentosComponent implements OnInit{


imageSrc: string | ArrayBuffer | null = null;
public token: string ="";
public identity: string ="";
public eventosp:any;
public status: string ="";
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
public NOMBRES:any;
public CODREGISTRO:any;

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

public errorvacio:boolean=false;
public imagen:boolean=false;
public mostrarimagen:boolean=true;
public errorimagen:boolean=true;

public isbusqueda:boolean=false;
public isedicion:boolean=false;
public parametro:any;
public primerParametro:any;
public parametro2:any;
public segundoParametro:any;

  selectedFile: File | null = null;
@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(private _UserService: UserService,
            private _router: Router,  
            private _route: ActivatedRoute,
            private http: HttpClient,
             private _documentosService: DocumentosService,
             private _profileService: ProfileService, 
             private _cursosService: CursosService
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
  this.parametro=this._route.snapshot.params;
this.primerParametro = this.parametro.parametro;
this.parametro2=this._route.snapshot.params;
this.segundoParametro = this.parametro2.parametro2;

this.isbusqueda=false;
this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;
this.parametronom.value='';
this.getDatosPersona();


}


//METODO  QUE CONSULTA TODOS LOS REGISTROS PARA
//TIPOS DOCUMENTO
 getTiposDocumentos($persona: any)
  {

    this._documentosService.getDocumentoAdjP($persona).subscribe(
response => {
  if(response.status = "success")
{

this.eventosp = response.tipos;
console.log(this.eventosp);
this.getCursoRegistrado();
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
this._profileService.getDatosPersona(this.segundoParametro).subscribe(
response => {
  if(response.status = "success")
{
this.datospersona = response.persona;
for (let personav of this.datospersona)
  {
    this.IDPER=personav.ID;
    this.NOMBRES=personav.APELLIDOS +' ' + personav.NOMBRES;
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


getCursoRegistrado()
  {

this._profileService.getPersonaRegistro(this.primerParametro,this.segundoParametro).subscribe(
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




modificarregistro()
{

this._cursosService.updateRegistros(this.token,this.CODREGISTRO).subscribe(

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



}
