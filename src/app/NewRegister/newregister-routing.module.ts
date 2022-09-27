import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRegisterPage } from './newregister.page';

const routes: Routes = [
  {
    path: '',
    component: NewRegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
