import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarMaterialPage } from './actualizar-material.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarMaterialPageRoutingModule {}
