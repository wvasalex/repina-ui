import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PromoCardComponent } from './main/promo-card/promo-card.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { SharedModule } from '../components/shared.module';
import { SphereComponent } from './main/sphere/sphere.component';
import { NavListComponent } from './nav/nav-list/nav-list.component';
import { IconNavListComponent } from './nav/icon-nav-list/icon-nav-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    PromoCardComponent,
    MainHeaderComponent,
    NavListComponent,
  ],
  declarations: [
    PromoCardComponent,
    MainHeaderComponent,
    SphereComponent,
    NavListComponent,
    IconNavListComponent,
  ],
})
export class BlocksModule {
}
