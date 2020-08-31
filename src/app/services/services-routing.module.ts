import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ServiceEditorComponent } from './service-editor/service-editor.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path: 'services', component: ServicesComponent },
  {
    path: 'services/new',
    component: ServiceEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: 'services/:id',
    component: ServiceComponent,
    resolve: {
      //project: ServiceResolver,
    },
  },
  {
    path: 'services/:id/edit',
    component: ServiceEditorComponent,
    canActivate: [SessionGuardService],
    resolve: {
      //project: ServiceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {
}
