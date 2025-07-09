//imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { DefaultComponent } from './components/default/default.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { OlvideComponent } from './components/olvide/olvide.component';
import { CambiopwdComponent } from './components/cambiopwd/cambiopwd.component';
import { TiposeventoComponent } from './components/tiposevento/tiposevento.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CrearcarreraComponent } from './components/crearcarrera/crearcarrera.component';
import { CreareventosComponent } from './components/creareventos/creareventos.component';
import { PersonaComponent } from './components/persona/persona.component';
import { ErrorComponent } from './components/error/error.component';
import { ComponetepruebaComponent } from './components/componeteprueba/componeteprueba.component';
import { CrearcursoComponent } from './components/crearcurso/crearcurso.component';
import { CursosadminComponent } from './components/cursosadmin/cursosadmin.component';
import { ActivosComponent } from './components/activos/activos.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { RegistradosComponent } from './components/registrados/registrados.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { TiposdocumentosComponent } from './components/tiposdocumentos/tiposdocumentos.component';
import { CreadocumentosComponent } from './components/creadocumentos/creadocumentos.component';
import { EventodocumentosComponent } from './components/eventodocumentos/eventodocumentos.component';
import { SubirdocumentosComponent } from './components/subirdocumentos/subirdocumentos.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { PorautorizarComponent } from './components/porautorizar/porautorizar.component';
import { DetdocumentosComponent } from './components/detdocumentos/detdocumentos.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { MisionvisionComponent } from './components/misionvision/misionvision.component';


//definir las rutas ip:puerto/componente
const appRoutes: Routes =[
{path: 'inicio', component: DefaultComponent},
{path: '', component: DefaultComponent},
{path: 'login', component: LoginComponent},
{path: 'logout/:sure', component: LoginComponent},
{path: 'olvide', component: OlvideComponent},
{path: 'tiposevento', component: TiposeventoComponent, canActivate: [AdminGuard]},
{path: 'carreras', component: CarrerasComponent, canActivate: [AdminGuard]},
{path: 'perfil', component: ProfileComponent},
{path: 'creacarrera', component: CrearcarreraComponent , canActivate: [AdminGuard] },
{path: 'creaeventos', component: CreareventosComponent , canActivate: [AdminGuard] },
{path: 'persona', component: PersonaComponent, canActivate: [AdminGuard]},
{path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard]},
{path: 'creacurso', component: CrearcursoComponent, canActivate: [AdminGuard]},
{path: 'administracion', component: CursosadminComponent, canActivate: [AdminGuard]},
{path: 'eventos', component: ActivosComponent},
{path: 'detalle/:parametro', component: DetalleComponent},

{path: 'subirdocumentos', component: SubirdocumentosComponent},

{path: 'seguimiento', component: SeguimientoComponent, canActivate: [AdminGuard]},
{path: 'registrados/:parametro', component: RegistradosComponent, canActivate: [AdminGuard]},
{path: 'reporte', component: ReporteComponent, canActivate: [AdminGuard]},
{path: 'tiposdocumentos', component: TiposdocumentosComponent, canActivate: [AdminGuard]},
{path: 'creadocumentos', component: CreadocumentosComponent , canActivate: [AdminGuard] },
{path: 'requeridos', component: EventodocumentosComponent , canActivate: [AdminGuard] },
{path: 'mision', component: MisionvisionComponent , canActivate: [AdminGuard] },

{path: 'autorizar/:parametro', component: PorautorizarComponent, canActivate: [AdminGuard]},
{path: 'detalledoc/:parametro/:parametro2', component: DetdocumentosComponent, canActivate: [AdminGuard]},
//{path: 'calificacion/:parametro/:parametro2', component: CalificacionComponent, canActivate: [AdminGuard]},
{path: 'calificacion/:parametro/:parametro2', component: CalificacionComponent},


{path: 'cambiopwd', component: CambiopwdComponent},
{path: 'nuevatransaccion', component: ComponetepruebaComponent},
//esta ruta siempre debe estar al final
{path: '**', component: ErrorComponent}
	];

//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
