import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoMaterialPageRoutingModule } from './nuevo-material-routing.module';

import { NuevoMaterialPage } from './nuevo-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoMaterialPageRoutingModule
  ],
  declarations: [NuevoMaterialPage]
})
export class NuevoMaterialPageModule {}
