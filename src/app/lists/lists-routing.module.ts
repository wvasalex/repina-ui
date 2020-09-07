import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ListsComponent } from './lists.component';
import { ListsResolver } from './lists.resolver';

const routes: Routes = [
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
