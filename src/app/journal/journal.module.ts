import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { JournalSnippetComponent } from './journal-snippet/journal-snippet.component';
import { ArticleComponent } from './article/article.component';
import { GridModule } from '../shared/grid/grid.module';
import { SharedModule } from '../shared/components/shared.module';
import { PageModule } from '../shared/page/page.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ArticlePartComponent } from './article/article-part/article-part.component';


@NgModule({
  declarations: [
    JournalComponent,
    JournalSnippetComponent,
    ArticleComponent,
    SubscribeComponent,
    ArticlePartComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    GridModule,
    SharedModule,
    PageModule,
  ],
  exports: [
    JournalSnippetComponent,
  ],
})
export class JournalModule {
}
