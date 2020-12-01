import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/components/shared.module';
import { ProjectSnippetOverlayComponent } from '@shared/projects/project-snippet/project-snippet-overlay/project-snippet-overlay.component';
import { RelatedProjectsComponent } from '@shared/projects/related-projects/related-projects.component';
import { ProjectAllComponent } from './project-all/project-all.component';
import { ProjectSnippetComponent } from './project-snippet/project-snippet.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    ProjectSnippetComponent,
    ProjectAllComponent,
    RelatedProjectsComponent,
  ],
  declarations: [
    ProjectSnippetComponent,
    ProjectSnippetOverlayComponent,
    ProjectAllComponent,
    RelatedProjectsComponent,
  ],
})
export class SharedProjectsModule {
}
