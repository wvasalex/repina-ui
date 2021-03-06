import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListEditorComponent } from './list-editor/list-editor.component';
import { SharedModule } from '@shared/components/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListServicesComponent } from './list-services/list-services.component';
import { BlogTagsComponent } from './blog/blog-tags/blog-tags.component';
import { ServicesTagsComponent } from './services/services-tags/services-tags.component';
import { ServicesGroupsComponent } from './services/services-groups/services-groups.component';
import { ServicesScopesComponent } from './services/services-scopes/services-scopes.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListRootComponent } from './list-root/list-root.component';

@NgModule({
  declarations: [ListsComponent, ListSelectorComponent, ListEditorComponent, ListServicesComponent, BlogTagsComponent, ServicesTagsComponent, ServicesGroupsComponent, ServicesScopesComponent, ListRootComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatSidenavModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    DragDropModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTooltipModule,
  ],
  exports: [
    ListServicesComponent,
  ],
})
export class ListsModule { }
