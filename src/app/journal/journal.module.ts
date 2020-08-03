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


@NgModule({
  declarations: [
    JournalComponent,
    JournalSnippetComponent,
    ArticleComponent,
    SubscribeComponent,
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
    MatCheckboxModule,
  ],
  exports: [
    JournalSnippetComponent,
  ],
})
export class JournalModule {
}
