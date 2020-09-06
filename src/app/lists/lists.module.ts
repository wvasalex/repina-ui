import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [ListsComponent, ListSelectorComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatSidenavModule,
  ],
})
export class ListsModule { }
