import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MainComponent } from './main.component';
import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { GridModule } from '@shared/grid/grid.module';
import { JournalModule } from '../journal/journal.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { SharedProjectsModule } from '@shared/projects/projects.module';
import { ListsModule } from '../lists/lists.module';
import { ServicesModule } from '../services/services.module';
import { MainProjectsComponent } from './main-projects/main-projects.component';
import { MainProjectComponent } from './main-projects/main-project/main-project.component';
import { MainArticlesComponent } from './main-articles/main-articles.component';
import { MainArticleComponent } from './main-articles/main-article/main-article.component';
import { MainAboutComponent } from './main-about/main-about.component';
import { MainAboutTextComponent } from './main-about/main-about-text/main-about-text.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  declarations: [
    MainComponent,
    MainProjectsComponent,
    MainProjectComponent,
    MainArticlesComponent,
    MainArticleComponent,
    MainAboutComponent,
    MainAboutTextComponent,
    MainHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PageModule,
    GridModule,
    JournalModule,
    BlocksModule,
    SharedProjectsModule,
    ListsModule,
    ServicesModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class MainModule { }
