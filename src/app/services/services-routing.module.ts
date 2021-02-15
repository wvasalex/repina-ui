import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ServiceEditorComponent } from './service-editor/service-editor.component';
import { ServiceComponent } from './service/service.component';
import { ServiceResolver } from './service.resolver';
import { ServicesEditorComponent } from './services-editor/services-editor.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },
  {
    path: 'new',
    component: ServiceEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: 'edit',
    component: ServicesEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: ':id',
    component: ServiceComponent,
    resolve: {
      service: ServiceResolver,
    },
  },
  {
    path: ':id/edit',
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
