import { Component , OnInit,ElementRef, ViewChild, Renderer2   } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';
import { MonitoreoService } from '../../services/monitoreo.service';
import { HttpClient } from '@angular/common/http';
import { Personas } from '../../models/personas';
import { Comprobantepago } from '../../models/comprobantepago';
 import { global } from '../../services/global';
import { CursosService } from '../../services/cursos.service';
import { DocumentosService } from '../../services/documentos.service';
import { Eventousuario } from '../../models/eventousuario';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
var ImageModule = require('docxtemplater-image-module-free');
import PizZipUtils from 'pizzip/utils/index.js';
import PizZip  from 'pizzip';
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
        providers: [UserService,ProfileService,DocumentosService,MonitoreoService,CursosService]
})
export class DetalleComponent  implements OnInit{
imageSrc: string | ArrayBuffer | null = null;
public title = 'sistema-angular';
  public identity:any;
  public token:any;
  public status: string ="";
  public Rol: string ="";
  public Id: string ="";
  public Email: string ="";
  public Nombre: string ="";
  public Creacion: string ="";
  public Creacion2:any;
  public Update: string ="";
  public Update2:any;
  public Imagen: string ="";
  public principio:any;
  public valoresp:any;
  public cursosp:any;
  public documentosp:any;
  public teventop:any;
  public idPERSONA:any;
  public estadoregistro:any;
    public estadoDET:any;
    public NOMBRECURSOP:any;
    
     public certificado:any;
  public fecha=[];
  public espagadop:any;
  public documentospd:any;
  public nombreadj:any;
  public parametrofecha: any;
    public eventp: Eventousuario;
    public cumpletodo:any;
  public codasignadop:any;
  public guardardocumentos:boolean=false;

  public validacion:boolean=false;
    public validacionpago:boolean=false;
  public registroo:boolean=false;
  
public botondocumentos:boolean=false;
public guardopago:boolean=false;
  public eventosp:any;
  public dep:any;
  public estapagado:any;
  public listaprovincias:any;
  public direccionactual:any;
  public listacantones:any;
  public darospersona:any;
    public codigoDepartamento:any;
        public moduloselected:any;
public urlStorage: string;
   public urlApi: string;
  public is_login:boolean=false;
  public editdireccion:boolean=false;
  public editpersona:boolean=false;
  public isguardar:boolean=false;
  public subir:boolean=false;
  public mensaje: string ="";
  public is_admin:boolean=false;
  public is_alerta:boolean=true;
public departamentosp:any;
public primerParametro:any;
public selectedProvinciaId:any;
public selectedCantonId:any;
  selectedFile: File | null = null;
  public persona: Personas;
    public comprobantep: Comprobantepago;
  
public parametro:any;

@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(public _UserService: UserService,
    private _profileService: ProfileService, 
    private _monitoreoService: MonitoreoService, 
        private _router: Router,
    private _route: ActivatedRoute,
    private _cursosService: CursosService,
    private _documentosService: DocumentosService,
    private http: HttpClient)



  {
this.loadUser();
    this.is_login=false;
  this.is_admin=false;

  this.identity = this._UserService.getIdentity();
this.token = this._UserService.getToken();
this.persona= new Personas('','','','','','','','');
this.comprobantep= new Comprobantepago('','','','');
 this.urlStorage = global.storage;
  this.urlApi = global.url;
      this.eventp = new Eventousuario('','', '', '', '', '', '');
  }

  ngOnInit()
  {

this.parametro=this._route.snapshot.params;
this.primerParametro = this.parametro.parametro;
this.getEventosActivos(this.primerParametro);
this.getDatosPersona();



  }



  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Simula el clic en el input de archivo
  }
    onFileChange(event: any) {

    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Establece la URL de datos como src de la imagen
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como URL de datos

this.botondocumentos=true;

    } else {
      this.imageSrc = null; // Oculta la imagen si no hay archivo
    }
  }

guardarAdjuntos(){

this.comprobantep= new Comprobantepago('',this.idPERSONA,this.primerParametro,'');


this._documentosService.guardarComprobante(this.comprobantep).subscribe(
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

    this.nombreadj='ADJ'+$nombrearchivo;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.post(this.urlApi + 'adjuntos/'+this.nombreadj+'.', formData).subscribe(
        (response) => {
          console.log('Archivo subido correctamente:', response);
          this.status= 'success';

          
          this.guardopago=true;
this.guardardocumentos=true;
this.botondocumentos=false;
  setTimeout(() => {
  this.guardardocumentos=false;  
  this.guardopago=false;
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


 getTiposDocumentos($parametro: any, $persona: any)
  {

    this.cumpletodo='1';
    this._documentosService.getParametroPP($parametro,$persona,this.primerParametro).subscribe(
response => {
  if(response.status = "success")
{

this.documentosp = response.tipos;
console.log('documentos');
console.log(this.documentosp);
for (let verpagado of this.documentosp)
  {
    this.estapagado=verpagado.PAGADO;
    this.estadoregistro=verpagado.REGISTRO;
    this.estadoDET=verpagado.ESTADO;
    this.certificado=verpagado.CERTIFICADO;

    if(verpagado.CUMPLETODOS=='0' && verpagado.NOMBRE!='COMPROBANTE DE PAGO')
    {
this.cumpletodo='0';
    }
  }

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


  getEventosActivos(parametro: any) {

    
    this._cursosService.getEventosCodigo(parametro).subscribe(
      response => {
        if (response.status == "success") {
          this.cursosp = response.cursos;
          console.log(this.cursosp);

for (let eventosv of this.cursosp)
  {
    this.teventop=eventosv.TIPOEVENTO;
    this.espagadop=eventosv.ESPAGADO;
    this.NOMBRECURSOP=eventosv.NOMBRECURSO;
  }

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


  registrar() {
    
if(this.cumpletodo=='0')
{
this.validacion=true;
}
else
{
this.validacion=false;

if(this.estapagado=='0')
{
  this.validacionpago=true;
}
else
{
  this.validacionpago=false;
  this.parametrofecha = new Date();
    
this.eventp = new Eventousuario('', this.identity.sub.toString(), this.primerParametro, '', '', this.parametrofecha.toISOString().split('T')[0],'0');

    this._cursosService.guardarRegistro(this.eventp).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.registroo = true;

          setTimeout(() => {
 this.registroo = false;
//this.getEventosActivos(this.primerParametro);
  this.getTiposDocumentos(this.teventop,this.idPERSONA);
          }, 2000);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
}


}


  }



  onError(event: Event) {
    (event.target as HTMLImageElement).src = this.urlStorage + 'avatar.jpg';
  }




  cambiarestado()
  {
    this.is_login=false;
   this.is_admin=false;
  }


  //metodo que se ejecuta cada vez que ocurra algo
  ngDoCheck()
  {
this.loadUser();
  }

  loadUser()
  {
this.identity = this._UserService.getIdentity();
this.token = this._UserService.getToken();
  }



getDatosPersona()
  {
    console.log('si entrqqa');
this._profileService.getDatosPersona(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{
this.darospersona = response.persona;

console.log(this.darospersona);

for (let personav of this.darospersona)
  {
    this.dep=personav.CODDEP;
    this.idPERSONA=personav.ID;
    this.Nombre=personav.APELLIDOS + ' ' + personav.NOMBRES;
  }


  setTimeout(() => {
 this.getTiposDocumentos(this.teventop,this.idPERSONA);
}, 2000);


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

generate($nombre :any) {


let nombreusu=this.Nombre;
let nombrecurso=this.NOMBRECURSOP;
let duracion='2 HORAS';let fecha='SEPTIEMBRE 2024';


const imageOptions = {
  centered: true,
    getImage(tag) {
        //return this.base64Parser(tag);
const base64Regex =
    /^data:image\/(png|jpg|svg|svg\+xml);base64,/;

    if (
        typeof tag !== "string" ||
        !base64Regex.test(tag)
    ) {
        return false;
    }

    const validBase64 =
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    const stringBase64 = tag.replace(base64Regex, "");

    // For nodejs, return a Buffer
    if (typeof Buffer !== "undefined" && Buffer.from) {
        return Buffer.from(stringBase64, "base64");
    }

    // For browsers, return a string (of binary content) :
    const binaryString = window.atob(stringBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
    },
    getSize() {
        return [200, 230];
    },
};
let fecha2=this.fecha;
//let  base64 = this.capturedImage;


    loadFile(
      //'https://docxtemplater.com/tag-example.docx',
        '/assets/img/CERTIFICADO.docx',
      function (error: Error | null, content: string) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
   //     const doc = new Docxtemplater(zip, {paragraphLoop: true,linebreaks: true,});
const doc = new Docxtemplater(zip, {modules: [new ImageModule(imageOptions)]});


        doc.setData({
          NOMBRE: nombreusu,
          NOMBRECURSO: nombrecurso,
          Fecha: fecha2,
        });
        try {
          doc.render();
        } catch (error) {
          throw error;
        }
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        saveAs(out, 'output.docx');
      }
    );

  }

}
