import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSnippetComponent } from './project-snippet/project-snippet.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/components/shared.module';
import { ProjectSnippetOverlayComponent } from '@shared/projects/project-snippet/project-snippet-overlay/project-snippet-overlay.component';
import { ProjectAllComponent } from './project-all/project-all.component';

@NgModule({
  declarations: [
    ProjectSnippetComponent,
    ProjectSnippetOverlayComponent,
    ProjectAllComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    ProjectSnippetComponent,
    ProjectAllComponent,
  ],
})
export class SharedProjectsModule {
}
