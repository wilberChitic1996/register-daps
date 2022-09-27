import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Login/login.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./Inventario/inventario.module').then( m => m.Tab4PageModule)
  },

  {
    path: 'tab3',
    loadChildren: () => import('./NewRegister/newregister.module').then( m => m.Tab3PageModule)
  },

  {
    path: 'tab2',
    loadChildren: () => import('./Menu/menu.module').then( m => m.Tab2PageModule)
  },

  {
    path: 'tab1',
    loadChildren: () => import('./Login/login.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule)
  },
  {
    path: 'nuevo-material',
    loadChildren: () => import('./nuevo-material/nuevo-material.module').then( m => m.NuevoMaterialPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
