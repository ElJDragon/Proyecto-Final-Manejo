import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos } from '../../models/cursos';
import { Parametros } from '../../models/parametros';
import { CarrerasService } from '../../services/carreras.service';
import { UserService } from '../../services/user.service';
import { CursosService } from '../../services/cursos.service';
import { HttpClient } from '@angular/common/http';
import { global } from '../../services/global';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-crearcurso',
  templateUrl: './crearcurso.component.html',
  styleUrls: ['./crearcurso.component.css'],
  providers: [CarrerasService, UserService, CursosService, EventosService]
})
export class CrearcursoComponent implements OnInit {
  @ViewChild('obsmodulo') obsmoduloInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public token: string = '';
  public identity: string = '';
  public urlApi: string;
  public urlStorage: string;
  public status: string = '';
  public imagenasignada: string = '';
  public codigoCarrerap: any;
  public codigoEventop: any;
  public pagadop: any;
  public publicop: any;

  public cursos: Cursos;
  public parametros: Parametros;

  public mostraruno: boolean = true;
  public mostrardos: boolean = false;
  public mostrartres: boolean = false;

  public botoncurso: boolean = true;
  public guardarcurso: boolean = false;
  public mostrarimagen: boolean = true;
  public imagen: boolean = false;
  public errorimagen: boolean = true;
  public fincurso: boolean = false;

  public selectedFile: File | null = null;
  public imageSrc: string | ArrayBuffer | null = null;

  public carrerasp: any;
  public eventosp: any;

  constructor(
    private _UserService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _carrerasService: CarrerasService,
    private _cursosService: CursosService,
    private _eventoService: EventosService,
    private http: HttpClient,
    private renderer: Renderer2
  ) {
    this.identity = this._UserService.getIdentity();
    this.token = this._UserService.getToken();
    this.cursos = new Cursos('', '', '', '', '', '0');
    this.parametros = new Parametros('', '', '', '', '', '', '');
    this.urlStorage = global.storage;
    this.urlApi = global.url;
  }

  ngOnInit() {
    this.getCarreras();
    this.getTipoEvento();
    this.fincurso = false;

  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }

  onError(event: Event) {
    (event.target as HTMLImageElement).src = this.urlStorage + 'avatar.jpg';
  }

  onErroradjunto(event: Event) {
    alert('entro al docuemnto imagen');
    (event.target as HTMLImageElement).src = this.urlStorage + 'adjunto.png';
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.imagen = true;
      this.mostrarimagen = false;
      this.errorimagen = false;
    } else {
      this.imageSrc = null;
    }
  }

  codigoCarrera(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.codigoCarrerap = selectElement.value;
  }

  codigoEvento(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.codigoEventop = selectElement.value;
  }

  guardarCurso($nombre: any) {
    if ($nombre != '') {
      this.cursos = new Cursos('', this.codigoEventop, this.codigoCarrerap, '', $nombre, '0');
      this._cursosService.guardarCurso(this.cursos).subscribe(
        response => {
          if (response) {
            this.status = 'success';
            this.guardarcurso = true;
            this.botoncurso = false;

            setTimeout(() => {
              this.mostraruno = false;
              this.mostrardos = true;
              this.mostrartres = false;
              this.guardarcurso = false;
              this.botoncurso = true;
            }, 3000);

            this.imagenasignada = response.id;
            this.uploadFile();
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

  EventoPagado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.pagadop = selectElement.value;
  }

  EventoPublico(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.publicop = selectElement.value;
  }

  guardarParametros($valor: any, $calificacion: any, $horas: any) {
    this.parametros = new Parametros('', this.imagenasignada, this.publicop, this.pagadop, $valor, $horas, $calificacion);

    this._cursosService.guardarParametros(this.parametros).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.guardarcurso = true;
          this.botoncurso = false;

          setTimeout(() => {
            this.mostraruno = false;
            this.mostrardos = false;
            this.mostrartres = true;
          }, 3000);
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

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.http.post(this.urlApi + 'cursos/' + this.imagenasignada + '.', formData).subscribe(
        response => {
          console.log('Archivo subido correctamente:', response);
        },
        error => {
          console.error('Error al subir archivo:', error);
        }
      );
    } else {
      console.log('Ningún archivo seleccionado.');
    }
  }

  fincursos() {
    this.fincurso = true;
  }

  getCarreras() {
    this._carrerasService.getCarrera().subscribe(
      response => {
        if (response.status == "OK") {
          this.carrerasp = response.tipos;
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

  getTipoEvento() {



    this._eventoService.getEvento().subscribe(
      response => {
        if (response.status == "OK") {
          console.log(response);
          this.eventosp = response.tipos;
          
          console.log(this.eventosp);
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
}
