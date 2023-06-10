import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Login/login.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./Inventario/inventario.module').then( m => m.Tab4PageModule)
  },

  {
    path: 'newregister',
    loadChildren: () => import('./NewRegister/newregister.module').then( m => m.Tab3PageModule)
  },

  {
    path: 'menu',
    loadChildren: () => import('./Menu/menu.module').then( m => m.Tab2PageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./Login/login.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule)
  },
  {
    path: 'nuevo-material',
    loadChildren: () => import('./nuevo-material/nuevo-material.module').then( m => m.NuevoMaterialPageModule)
  },
  {
    path: 'actualizar-material/:id',
    loadChildren: () => import('./actualizar-material/actualizar-material.module').then( m => m.ActualizarMaterialPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
