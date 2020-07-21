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
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    JournalComponent,
    JournalSnippetComponent,
    ArticleComponent,
    SubscribeComponent,
    ArticlePartComponent,
    ArticleEditorComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    GridModule,
    SharedModule,
    PageModule,
    BlocksModule,
    FormsModule,
  ],
  exports: [
    JournalSnippetComponent,
  ],
})
export class JournalModule {
}
