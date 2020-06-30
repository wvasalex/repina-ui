import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id', component: ProjectDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {
}
