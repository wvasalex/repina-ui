import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { PageModule } from '@shared/page/page.module';
import { SharedModule } from '@shared/components/shared.module';
import { GridModule } from '@shared/grid/grid.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailStepComponent } from './project-detail/project-detail-step/project-detail-step.component';
import { ProjectRolesComponent } from './project/project-roles/project-roles.component';
import { ProjectComponent } from './project/project.component';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { ProjectRootComponent } from './project/project-root/project-root.component';
import { MatButtonModule } from '@angular/material/button';
import { ProjectBlockComponent } from './project/project-block/project-block.component';
import { ProjectImageComponent } from './project/project-image/project-image.component';
import { ProjectGalleryComponent } from './project/project-gallery/project-gallery.component';
import { ProjectTextComponent } from './project/project-text/project-text.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ProjectVideoComponent } from './project/project-video/project-video.component';
import { ProjectQuoteComponent } from './project/project-quote/project-quote.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProjectSnippetComponent } from './project-snippet/project-snippet.component';
import { ListContentModule } from '@shared/list-content/list-content.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectDetailStepComponent,
    ProjectRolesComponent,
    ProjectComponent,
    ProjectRootComponent,
    ProjectBlockComponent,
    ProjectImageComponent,
    ProjectGalleryComponent,
    ProjectTextComponent,
    ProjectEditorComponent,
    ProjectVideoComponent,
    ProjectQuoteComponent,
    ProjectSnippetComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    PageModule,
    SharedModule,
    MatGridListModule,
    GridModule,
    BlocksModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonToggleModule,
    ListContentModule,
  ],
})
export class ProjectsModule {
}
