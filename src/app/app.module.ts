import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIRESTService } from './services/apirest.service';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Md5 } from 'ts-md5/dist/esm/md5';
import { DatePipe } from '@angular/common';
import { RegistroService } from './services/proveedores/registro.service';
import { MaterialService } from './services/proveedores/material.service';
import { EmpleadoService } from './services/proveedores/empleado.service';
import { UsuariosService } from './services/proveedores/usuarios.service';






@NgModule({
  declarations: [
    AppComponent

    ],

  imports: [FormsModule,ReactiveFormsModule, BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    APIRESTService,
    RegistroService,
    MaterialService,
    EmpleadoService,
    UsuariosService,
    DatePipe
    ],
  bootstrap: [AppComponent],

})
export class AppModule {}
