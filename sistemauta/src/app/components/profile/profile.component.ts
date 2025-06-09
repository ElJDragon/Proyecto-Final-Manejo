import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';
import { MonitoreoService } from '../../services/monitoreo.service';
import { HttpClient } from '@angular/common/http';
import { Direccion } from '../../models/direccion';
import { Personas } from '../../models/personas';
 import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
      providers: [UserService,ProfileService,MonitoreoService]
})
export class ProfileComponent implements OnInit, DoCheck {


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
    public dep:any;
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
  public direccion: Direccion;
  public persona: Personas;

  constructor(public _UserService: UserService,
    private _profileService: ProfileService, 
    private _monitoreoService: MonitoreoService, 
    private http: HttpClient)



  {
this.loadUser();
    this.is_login=false;
  this.is_admin=false;

  this.identity = this._UserService.getIdentity();
this.token = this._UserService.getToken();
this.direccion= new Direccion('','');
this.persona= new Personas('','','','','','','','');
 this.urlStorage = global.storage;
  this.urlApi = global.url;
  }

  ngOnInit()
  {
this.getUsuarios();
this.getProvincias();
this.getDireccion();
this.getDatosPersona();
  }



cambiar($opcion: any): void {
  // Asignar directamente el valor recibido a moduloselected.
  this.moduloselected = $opcion;
  // Llamar a onChangeModulo, pasando el valor de moduloselected.
  this.onChangeModulo({ target: { value: this.moduloselected } } as any);

  // Forzar la actualización del select si es necesario.
  const selectElement = document.getElementById('bootstrap-wizard-validation-wizard-modulo') as HTMLSelectElement;
  if (selectElement) {
    selectElement.value = this.moduloselected; // No se convierte a string, ya que debe ser string.
  }
}

onChangeModulo(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;

  // Aquí asignas el valor directamente como string.
  this.moduloselected = selectElement.value;
}



editarDireccion()
{
  this.editdireccion=true;
}
cancelDireccion()
{
  this.editdireccion=false;
}
editarPersona()
{
  this.editpersona=true;
  this.cambiar(this.dep);
}
cancelPersona()
{
  this.editpersona=false;
}


onSelectProvincia(event: Event) {
    const target = event.target as HTMLSelectElement;
     this.selectedProvinciaId = target.value;
     this.getCantones(this.selectedProvinciaId);
  }

onSelectCanton(event: Event) {
    const target = event.target as HTMLSelectElement;
     this.selectedCantonId = Number(target.value);
     this.isguardar=true;
  }

  onError(event: Event) {
    (event.target as HTMLImageElement).src = this.urlStorage + 'avatar.jpg';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.subir=true;
  }

   uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.post(this.urlApi  + 'profile/'+this.primerParametro+'.', formData).subscribe(
        (response) => {
          console.log('Archivo subido correctamente:', response);
          this.mensaje='true';
          this.subir=false;
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000 milisegundos = 2 segundos          

        },
        (error) => {
          console.error('Error al subir archivo:', error);
           this.mensaje='false';
           this.subir=false;
        }
      );
    } else {
      console.log('Ningún archivo seleccionado.');
      this.mensaje='false';
      this.subir=false;
    }
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

guardaPersona(id: any,nombres: any,apellidos: any, telefono: any)
{
    this.persona= new Personas(this.identity.sub,this.codigoDepartamento,nombres,apellidos,'',telefono,'',id);

this._monitoreoService.actualizaPersona(this.token,this.identity.sub,this.persona).subscribe(
response => {
if(response)
{
this.status= 'success';
this.editpersona=false;
this.getDatosPersona();
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

guardaDireccion(){

  this.direccion= new Direccion(this.identity.sub,this.selectedCantonId);

this._monitoreoService.guardarDireccion(this.direccion).subscribe(
response => {
if(response)
{
this.status= 'success';
this.isguardar=false;
this.editdireccion=false;
this.getDireccion();
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

  
getDireccion()
{
this._profileService.getDireccion(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{
this.direccionactual = response.direccion;
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





 getUsuarios()
  {
this._UserService.getrole(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{
this.valoresp = response.user;
console.log(this.valoresp);
this.Id=this.valoresp.id;
this.primerParametro=this.Id;
this.Rol=this.valoresp.role;
this.Email=this.valoresp.Email;
this.Nombre=this.valoresp.Nombre;
this.Creacion=this.valoresp.created_at;
const date1 = new Date(this.Creacion);
const year1 = date1.getFullYear();
const month1 = ('0' + (date1.getMonth() + 1)).slice(-2); // getMonth() devuelve de 0 a 11, por eso sumamos 1 y formateamos a dos dígitos
const day1 = ('0' + date1.getDate()).slice(-2); // Formateamos a dos dígitos
this.Creacion2 = year1+'/'+month1+'/'+day1;
this.Update=this.valoresp.updated_at;
const date = new Date(this.Update);
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() devuelve de 0 a 11, por eso sumamos 1 y formateamos a dos dígitos
const day = ('0' + date.getDate()).slice(-2); // Formateamos a dos dígitos
this.Update2 = year+'/'+month+'/'+day;
this.Imagen=this.valoresp.image;
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


 getProvincias()
  {
this._profileService.getProvince().subscribe(
response => {
  if(response.status = "success")
{
this.listaprovincias = response.provincias;
console.log(this.listaprovincias);
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


getCantones(codigo: any)
  {
this._profileService.getCantonesp(codigo).subscribe(
response => {
  if(response.status = "success")
{
this.listacantones = response.cantones;
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

getDatosPersona()
  {
    console.log('si entrqqa');
this._profileService.getDatosPersona(this.identity.sub).subscribe(
response => {
  if(response.status = "success")
{
this.darospersona = response.persona;

console.log('si entra');
console.log(this.darospersona);

for (let personav of this.darospersona)
  {
    this.dep=personav.CODDEP;
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



}
