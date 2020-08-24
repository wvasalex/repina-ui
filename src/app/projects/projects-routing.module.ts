import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectResolver } from './project.resolver';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'projects/new',
    component: ProjectEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver,
    },
  },
  {
    path: 'projects/:id/edit',
    component: ProjectEditorComponent,
    canActivate: [SessionGuardService],
    resolve: {
      project: ProjectResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {
}
