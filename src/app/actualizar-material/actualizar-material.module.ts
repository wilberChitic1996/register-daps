import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarMaterialPageRoutingModule } from './actualizar-material-routing.module';


import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarMaterialPage } from './actualizar-material.page';
import { ZeroValidatorDirective } from '../shared/ValidarZero-Directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ActualizarMaterialPageRoutingModule
  ],
  declarations: [ActualizarMaterialPage, ZeroValidatorDirective]
})
export class ActualizarMaterialPageModule {}
