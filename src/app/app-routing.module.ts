import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AgencyComponent } from './agency/agency.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then((m) => {
      return m.ListsModule;
    }),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
