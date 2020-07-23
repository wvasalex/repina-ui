import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PromoCardComponent } from './main/promo-card/promo-card.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { SharedModule } from '../components/shared.module';
import { SphereComponent } from './main/sphere/sphere.component';
import { NavListComponent } from './nav/nav-list/nav-list.component';
import { IconNavListComponent } from './nav/icon-nav-list/icon-nav-list.component';
import { ArticleHeaderComponent } from './journal/article-header/article-header.component';
import { ArticlePartComponent } from '@shared/blocks/journal/article-part/article-part.component';
import { ArticleTextComponent } from './journal/article-text/article-text.component';
import { ArticleTitleComponent } from './journal/article-title/article-title.component';
import { BlocksRenderComponent } from './blocks-render/blocks-render.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    PromoCardComponent,
    MainHeaderComponent,
    NavListComponent,
    ArticleHeaderComponent,
    IconNavListComponent,
    ArticlePartComponent,
    BlocksRenderComponent,
  ],
  declarations: [
    PromoCardComponent,
    MainHeaderComponent,
    SphereComponent,
    NavListComponent,
    IconNavListComponent,
    ArticleHeaderComponent,
    ArticlePartComponent,
    ArticleTextComponent,
    ArticleTitleComponent,
    BlocksRenderComponent,
  ],
})
export class BlocksModule {
}
