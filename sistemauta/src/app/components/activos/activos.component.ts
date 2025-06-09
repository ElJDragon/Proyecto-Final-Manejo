import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CursosService } from '../../services/cursos.service';
import { global } from '../../services/global';
import { Eventousuario } from '../../models/eventousuario';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css'],
  providers: [CursosService, UserService]
})
export class ActivosComponent implements OnInit {

  public token: string = "";
  public identity: string = "";
  public status: string = "";
  public cursosp: any;
  public parametrofecha: any;
  
  public registrocur: any;
  public urlStorage: string = "";
  public eventp: Eventousuario;
  
   public registroo: boolean = false;

  constructor(
    private _UserService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cursosService: CursosService
  ) {
    this.identity = this._UserService.getIdentity();
    this.token = this._UserService.getToken();
    this.urlStorage = global.storage;
    this.eventp = new Eventousuario('', '', '', '', '', '');
  }

  ngOnInit() {
    this.getEventosActivos();
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getEventosActivos() {
    this._cursosService.getEventos(this.identity.sub.toString()).subscribe(
      response => {
        if (response.status == "success") {
          this.cursosp = response.cursos;
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

pasarvalores($codigocurso: any)
{
this.registrocur=$codigocurso;
}


  registrar() {
    
    this.parametrofecha = new Date();
    
this.eventp = new Eventousuario('', this.identity.sub.toString(), this.registrocur, '', '', this.parametrofecha.toISOString().split('T')[0]);

    this._cursosService.guardarRegistro(this.eventp).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.registroo = true;

          setTimeout(() => {
 this.registroo = false;
this.getEventosActivos();
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
}
