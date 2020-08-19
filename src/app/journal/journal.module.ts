import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { JournalSnippetComponent } from './journal-snippet/journal-snippet.component';
import { ArticleComponent } from './article/article.component';
import { GridModule } from '@shared/grid/grid.module';
import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ArticleHeaderComponent } from './article/article-header/article-header.component';
import { ArticleTextComponent } from './article/article-text/article-text.component';
import { ArticleImageComponent } from './article/article-image/article-image.component';
import { ArticleAuthorComponent } from './article/article-author/article-author.component';
import { ArticlePartComponent } from './article/article-part/article-part.component';
import { ArticleBlankComponent } from './article/article-blank/article-blank.component';
import { ArticleQuoteComponent } from './article/article-quote/article-quote.component';
import { ArticleVideoComponent } from './article/article-video/article-video.component';


@NgModule({
  declarations: [
    JournalComponent,
    JournalSnippetComponent,
    ArticleComponent,
    SubscribeComponent,
    ArticleEditorComponent,
    ArticleHeaderComponent,
    ArticleTextComponent,
    ArticleImageComponent,
    ArticleVideoComponent,
    ArticleAuthorComponent,
    ArticlePartComponent,
    ArticleBlankComponent,
    ArticleQuoteComponent,
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    GridModule,
    SharedModule,
    PageModule,
    BlocksModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [
    JournalSnippetComponent,
  ],
})
export class JournalModule {
}
