import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectResolver } from './project.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'tag/:url',
    component: ProjectsComponent,
  },
  {
    path: 'new',
    component: ProjectEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: ':id',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver,
    },
  },
  {
    path: ':id/edit',
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
