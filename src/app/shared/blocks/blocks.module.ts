import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PromoCardComponent } from './main/promo-card/promo-card.component';
import { SharedModule } from '../components/shared.module';
import { SphereComponent } from './main/sphere/sphere.component';
import { NavListComponent } from './nav/nav-list/nav-list.component';
import { IconNavListComponent } from './nav/icon-nav-list/icon-nav-list.component';
import { BlocksRenderComponent } from './blocks-render/blocks-render.component';
import { BlockDirective } from '@shared/blocks/block.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseBlock } from '@shared/blocks/block.component';
import { BlockSwitcherComponent } from './block-switcher/block-switcher.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridModule } from '@shared/grid/grid.module';
import { DynamicModule } from 'ng-dynamic-component';
import { MatMenuModule } from '@angular/material/menu';
import { BlockBlankComponent } from './block-blank/block-blank.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MdComponent } from './md/md.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    DynamicModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    GridModule,
    MatMenuModule,
    DragDropModule,
    MarkdownModule,
  ],
  exports: [
    PromoCardComponent,
    NavListComponent,
    IconNavListComponent,
    BlocksRenderComponent,
    BlockDirective,
    MdComponent,
    SphereComponent,
  ],
  declarations: [
    PromoCardComponent,
    SphereComponent,
    NavListComponent,
    IconNavListComponent,
    BlocksRenderComponent,
    BaseBlock,
    BlockDirective,
    BlockSwitcherComponent,
    BlockBlankComponent,
    MdComponent,
  ],
})
export class BlocksModule {
}
