import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UComponent } from './u.component';

const routes: Routes = [
  {
    path: '',
    component: UComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class URoutingModule { }
