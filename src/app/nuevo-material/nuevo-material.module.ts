import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoMaterialPageRoutingModule } from './nuevo-material-routing.module';

import { NuevoMaterialPage } from './nuevo-material.page';

import { ReactiveFormsModule } from '@angular/forms';
import { ZeroValidatorDirective } from '../shared/ValidarZero-Directive';
import { NFC } from '@awesome-cordova-plugins/nfc/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoMaterialPageRoutingModule
  ],
  providers:[
    NFC
  ],
  declarations: [NuevoMaterialPage, ZeroValidatorDirective]
})
export class NuevoMaterialPageModule {}
