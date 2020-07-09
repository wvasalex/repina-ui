import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../components/shared.module';
import { RouterModule } from '@angular/router';
import { BurgerComponent } from './burger/burger.component';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
  declarations: [
    MenuComponent,
    BurgerComponent,
    DrawerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    MenuComponent,
    DrawerComponent,
  ],
})
export class MenuModule { }
