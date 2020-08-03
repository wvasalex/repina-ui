import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../components/shared.module';
import { RouterModule } from '@angular/router';
import { BurgerComponent } from './burger/burger.component';
import { DrawerComponent } from './drawer/drawer.component';
import { MenuEditorComponent } from './menu-editor/menu-editor.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { BlocksModule } from '@shared/blocks/blocks.module';

@NgModule({
  declarations: [
    MenuComponent,
    BurgerComponent,
    DrawerComponent,
    MenuEditorComponent,
    MenuItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BlocksModule,
  ],
  exports: [
    MenuComponent,
    DrawerComponent,
  ],
})
export class MenuModule { }
