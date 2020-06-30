import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { PageModule } from '../shared/page/page.module';
import { SharedModule } from '../shared/components/shared.module';
import { GridModule } from '../shared/grid/grid.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailStepComponent } from './project-detail/project-detail-step/project-detail-step.component';
import { ProjectDetailRolesComponent } from './project-detail/project-detail-roles/project-detail-roles.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectDetailStepComponent,
    ProjectDetailRolesComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    PageModule,
    SharedModule,
    MatGridListModule,
    GridModule,
  ],
})
export class ProjectsModule {
}
