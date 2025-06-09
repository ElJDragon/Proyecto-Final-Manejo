import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CursosService } from '../../services/cursos.service';


@Component({
  selector: 'app-registrados',
  templateUrl: './registrados.component.html',
  styleUrls: ['./registrados.component.css'],
    providers: [UserService, CursosService]
})
export class RegistradosComponent {


public token: string = '';
  public eventosp: any;
  public status: string = '';
  public paginacion: any[] = [];
  public cuantos: number = 0;
  public totaldepaginas: number = 0;
  public registro: number = 0;
  public registrototal: number = 0;
  public paginaactual: number = 0;
  public registrosxpagina: number = 6;
  public parametronom: any;
  public fechaActual: any;
  public placa: any;
  public parametrodepENV: any;
  public parametronomENV: any;
  public dropdown: any;
  public ispaginacion: boolean = false;
  public istemporal: boolean = true;

  public uno: boolean = true;
  public dos: boolean = false;
  public tres: boolean = false;
  public dosd: boolean = true;
  public tresd: boolean = true;
  public atras: boolean = false;
  public delante: boolean = true;

  public solo1: boolean = false;
  public solo2: boolean = false;
  public solo3: boolean = false;
  public solo4: boolean = false;
  public solo5: boolean = false;
  public solo6: boolean = false;
  public errorvacio: boolean = false;

  public isbusqueda: boolean = false;
public parametro:any;
public primerParametro:any;
  constructor(
    private _UserService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cursosService: CursosService
  ) {
    this.token = this._UserService.getToken();
  }

  ngOnInit() {

    this.parametro=this._route.snapshot.params;
this.primerParametro = this.parametro.parametro;


    this.isbusqueda = false;
    this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;
    if (this.parametronom) this.parametronom.value = '';
    this.getCursosAdmin();
    this.fechaActual = new Date().toLocaleDateString();
  }

  Paginacion(pagina: any) {
    this.paginacion = [];
    this.registro = 0;
    this.cuantos = 0;

    if (this.totaldepaginas <= 2) this.tresd = false;
    if (this.totaldepaginas <= 1) this.dosd = this.tresd = false;

    if (pagina == 4) {
      this.atras = true;
      if (this.paginaactual <= this.totaldepaginas - 1) this.paginaactual++;
      if (this.paginaactual >= this.totaldepaginas - 1) this.delante = false;

      this.uno = this.paginaactual == 1;
      this.dos = this.paginaactual != 1;
      this.tres = !this.uno && !this.dos;
    }

    if (pagina == 0) {
      this.delante = true;
      if (this.paginaactual > 0) this.paginaactual--;
      this.uno = this.paginaactual == 0;
      this.dos = this.paginaactual == 1;
      this.tres = false;
      this.atras = this.paginaactual != 0;
    }

    if (pagina == 1) {
      this.paginaactual = 0;
      this.atras = false;
      this.delante = this.totaldepaginas > 1;
      this.uno = true;
      this.dos = this.tres = false;
    }

    if (pagina == 2) {
      this.paginaactual = 1;
      this.atras = true;
      this.delante = this.paginaactual < this.totaldepaginas - 1;
      this.uno = this.tres = false;
      this.dos = true;
    }

    if (pagina == 3) {
      this.paginaactual = 2;
      this.atras = true;
      this.delante = this.paginaactual < this.totaldepaginas - 1;
      this.uno = this.dos = false;
      this.tres = true;
    }

    for (let numero of this.eventosp) {
      this.registro++;
      if (this.cuantos < this.registrosxpagina && this.registro >= this.registrosxpagina * this.paginaactual + 1) {
        this.paginacion[this.cuantos] = numero;
        this.cuantos++;
      }
    }

    this.solo1 = this.cuantos === 1;
    this.solo2 = this.cuantos === 2;
    this.solo3 = this.cuantos === 3;
    this.solo4 = this.cuantos === 4;
    this.solo5 = this.cuantos === 5;
    this.solo6 = this.cuantos === 6;
    this.cuantos = 0;
  }

  getCursosAdmin() {
    this.paginacion = [];
    this.cuantos = 0;
    this._cursosService.getEventosR(this.primerParametro).subscribe(
      response => {
        if (response.status === "success") {
          this.eventosp = response.cursos;
          this.registrototal = this.eventosp.length;
          this.totaldepaginas = this.registrototal / this.registrosxpagina;
          this.ispaginacion = this.registrototal > this.registrosxpagina;

          for (let numero of this.eventosp) {
            if (this.cuantos < this.registrosxpagina) {
              this.paginacion[this.cuantos++] = numero;
            } else {
              break;
            }
          }

          this.paginaactual = 1;
          this.Paginacion(0);
        } else {
          this.status = 'error1';
        }
      },
      error => {
        this.status = 'error1';
        console.error(error);
      }
    );
  }

  salir() {
    setTimeout(() => {
      this.dropdown.style.display = 'none';
    }, 1000);
  }

  getVehiculosParametros() {
    this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;
    if (this.parametronom && this.parametronom.value !== '') {
      this.getEventos1p();
      this.isbusqueda = true;
    } else {
      this.getCursosAdmin();
      this.isbusqueda = false;
    }
  }

  getEventos1p() {
    this.paginacion = [];
    this.cuantos = 0;
    this.parametronom = document.getElementById('pnombres') as HTMLInputElement | null;

    if (this.parametronom?.value === '') {
      this.parametronomENV = 0;
    } else {
      this.parametronomENV = this.parametronom?.value;
    }

    this._cursosService.getEventosP(this.parametronom.value).subscribe(
      response => {
        if (response.status === "success") {
          this.eventosp = response.cursos;
          this.registrototal = this.eventosp.length;
          this.totaldepaginas = this.registrototal / this.registrosxpagina;
          this.ispaginacion = this.registrototal > this.registrosxpagina;

          for (let numero of this.eventosp) {
            if (this.cuantos < this.registrosxpagina) {
              this.paginacion[this.cuantos++] = numero;
            } else {
              break;
            }
          }

          this.paginaactual = 1;
          this.Paginacion(0);
        } else {
          this.status = 'error2';
        }
      },
      error => {
        this.status = 'error2';
        console.error(error);
      }
    );
  }


}