import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ServiceEditorComponent } from './service-editor/service-editor.component';
import { ServiceComponent } from './service/service.component';
import { ServiceResolver } from './service.resolver';
import { AgencyEditorComponent } from '../agency/agency-editor/agency-editor.component';
import { ServicesEditorComponent } from './services-editor/services-editor.component';

const routes: Routes = [
  { path: 'services', component: ServicesComponent },
  {
    path: 'services/new',
    component: ServiceEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: 'services/edit',
    component: ServicesEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: 'services/:id',
    component: ServiceComponent,
    resolve: {
      service: ServiceResolver,
    },
  },
  {
    path: 'services/:id/edit',
    component: ServiceEditorComponent,
    canActivate: [SessionGuardService],
    resolve: {
      service: ServiceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {
}
