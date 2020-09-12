import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ListsComponent } from './lists.component';
import { ListsResolver } from './lists.resolver';
import { ListServicesComponent } from './list-services/list-services.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'awards',
    pathMatch: 'full',
  },
  {
    path: 'services',
    canActivate: [SessionGuardService],
    component: ListServicesComponent,
  },
  {
    path: ':id',
    canActivate: [SessionGuardService],
    resolve: {
      list: ListsResolver,
    },
    component: ListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsRoutingModule {
}
