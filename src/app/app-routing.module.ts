import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { NotfoundComponent } from '@shared/notfound/notfound.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'lists',
    loadChildren: () => import('./lists/lists.module').then((m) => {
      return m.ListsModule;
    }),
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
