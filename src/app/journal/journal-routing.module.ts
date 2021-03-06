import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal.component';
import { ArticleComponent } from './article/article.component';
import { SessionGuardService } from '@shared/services/session/guard/session-guard.service';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleResolver } from './article.resolver';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
  },
  {
    path: 'tag/:url',
    component: JournalComponent,
  },
  {
    path: 'new',
    component: ArticleEditorComponent,
    canActivate: [SessionGuardService],
  },
  {
    path: ':id',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver,
    },
  },
  {
    path: ':id/edit',
    component: ArticleEditorComponent,
    canActivate: [SessionGuardService],
    resolve: {
      article: ArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalRoutingModule {
}
