import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarMaterialPageRoutingModule } from './actualizar-material-routing.module';

import { ActualizarMaterialPage } from './actualizar-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarMaterialPageRoutingModule
  ],
  declarations: [ActualizarMaterialPage]
})
export class ActualizarMaterialPageModule {}
