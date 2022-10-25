import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoMaterialPageRoutingModule } from './nuevo-material-routing.module';

import { NuevoMaterialPage } from './nuevo-material.page';

import { ReactiveFormsModule } from '@angular/forms';
import { ZeroValidatorDirective } from '../shared/ValidarZero-Directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoMaterialPageRoutingModule
  ],
  providers:[

  ],
  declarations: [NuevoMaterialPage, ZeroValidatorDirective]
})
export class NuevoMaterialPageModule {}
