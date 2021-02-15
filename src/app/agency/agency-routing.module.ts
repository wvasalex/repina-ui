import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { AgencyEditorComponent } from './agency-editor/agency-editor.component';

const routes: Routes = [
  { path: '', component: AgencyComponent },
  {
    path: 'edit',
    component: AgencyEditorComponent,
    canActivate: [SessionGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
