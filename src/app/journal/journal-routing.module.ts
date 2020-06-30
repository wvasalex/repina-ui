import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {path: 'blog', component: JournalComponent},
  {path: 'blog/:id', component: ArticleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
