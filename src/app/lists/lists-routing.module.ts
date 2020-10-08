import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ListsComponent } from './lists.component';
import { ListsResolver } from './lists.resolver';
import { ListServicesComponent } from './list-services/list-services.component';
import { BlogTagsComponent } from './blog/blog-tags/blog-tags.component';
import { ServicesTagsComponent } from './services/services-tags/services-tags.component';

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
    path: 'blog-tags',
    canActivate: [SessionGuardService],
    component: BlogTagsComponent,
  },
  {
    path: 'services-tags',
    canActivate: [SessionGuardService],
    component: ServicesTagsComponent,
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
