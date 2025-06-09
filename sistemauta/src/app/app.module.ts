import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from './app.routing';
import { ExportAsModule } from 'ngx-export-as';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { PersonaComponent } from './components/persona/persona.component';
import { DefaultComponent } from './components/default/default.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { OlvideComponent } from './components/olvide/olvide.component';
import { CambiopwdComponent } from './components/cambiopwd/cambiopwd.component';
import { TiposeventoComponent } from './components/tiposevento/tiposevento.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CrearcarreraComponent } from './components/crearcarrera/crearcarrera.component';
import { CreareventosComponent } from './components/creareventos/creareventos.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    DefaultComponent,
    UsuariosComponent,
    ErrorComponent,
    LoginComponent,
    OlvideComponent,
    CambiopwdComponent,
    TiposeventoComponent,
    CarrerasComponent,
    ProfileComponent,
    CrearcarreraComponent,
    CreareventosComponent
  ],
  imports: [
    BrowserModule,
        routing,
    FormsModule,
    HttpClientModule,
   NgxChartsModule,
   BrowserAnimationsModule,
   ExportAsModule,ColorPickerModule, MatNativeDateModule,MatFormFieldModule,
   MatDatepickerModule,MatInputModule,MatSlideToggleModule,ReactiveFormsModule,
   MatAutocompleteModule
  ],
  providers: [
appRoutingProviders
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
