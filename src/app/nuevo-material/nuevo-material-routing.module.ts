import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoMaterialPage } from './nuevo-material.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoMaterialPageRoutingModule {}
