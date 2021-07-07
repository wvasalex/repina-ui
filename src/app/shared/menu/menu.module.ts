import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../components/shared.module';
import { RouterModule } from '@angular/router';
import { DrawerComponent } from './drawer/drawer.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    DrawerComponent,
    MenuItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BlocksModule,
    DragDropModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [
    MenuComponent,
    DrawerComponent,
  ],
})
export class MenuModule { }
