import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Cursos } from '../../models/cursos';
import { CursosService } from '../../services/cursos.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-cursosadmin',
  templateUrl: './cursosadmin.component.html',
  styleUrls: ['./cursosadmin.component.css'],
  providers: [UserService, CursosService]
})
export class CursosadminComponent implements OnInit {

  public token: string = "";
  public identity: string = "";
  public cursos: Cursos;
  public codigocambiar: any;
  public cursocambiar: any;
  public totalcursos: any;
  public cursosp: any;
  public status: string = "";
  public urlStorage: string;
  public urlApi: string;

  constructor(
    private _UserService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private http: HttpClient,
    private _cursosService: CursosService,
  ) {
    this.identity = this._UserService.getIdentity();
    this.token = this._UserService.getToken();
    this.cursos = new Cursos('', '', '', '', '', '');
    this.urlStorage = global.storage;
    this.urlApi = global.url;
  }
//Primera funcion que s eejecuta por defecto al acargar una trasaccion
  ngOnInit() {
    alert('Bienvenido a la administración de cursos');
    this.getCursosAdmin();
  }

  cambiarEstadoCurso(event: Event, $curso: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.codigocambiar = selectElement.value;
    this.cursocambiar = $curso;
    this.activarCuros(this.codigocambiar, this.cursocambiar);
  }

  getCursosAdmin() {
    this._cursosService.getCursosAdmin().subscribe(
      response => {
        if (response.status == "success") {
          this.cursosp = response.cursos;
          for (let array of this.cursosp) {
            this.totalcursos = array.TOTAL;
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

  activarCuros($activar: any, $codigocurso: any) {
    this.cursos = new Cursos($codigocurso, '', '', '', '', $activar);
    this._cursosService.updateCurso(this.token, this.cursos, $codigocurso).subscribe(
      response => {
        if (response) {
          this.status = 'success1';
          this.getCursosAdmin();
          setTimeout(() => {
            this.status = '';
          }, 3000);
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
