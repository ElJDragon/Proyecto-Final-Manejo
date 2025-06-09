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
{path: 'seguimiento', component: SeguimientoComponent, canActivate: [AdminGuard]},
{path: 'registrados/:parametro', component: RegistradosComponent, canActivate: [AdminGuard]},
{path: 'reporte', component: ReporteComponent, canActivate: [AdminGuard]},
{path: 'cambiopwd', component: CambiopwdComponent},
{path: 'nuevatransaccion', component: ComponetepruebaComponent},
//esta ruta siempre debe estar al final
{path: '**', component: ErrorComponent}
	];

//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
