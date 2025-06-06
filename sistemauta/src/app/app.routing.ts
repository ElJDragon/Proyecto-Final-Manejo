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
{path: 'cambiopwd', component: CambiopwdComponent},
//esta ruta siempre debe estar al final
{path: '**', component: ErrorComponent}
	];

//exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
