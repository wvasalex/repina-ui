import { Injectable } from '@angular/core';
import { MainProjectComponent } from './main-projects/main-project/main-project.component';
import { MainProjectsComponent } from './main-projects/main-projects.component';
import { MainArticlesComponent } from './main-articles/main-articles.component';
import { MainAboutComponent } from './main-about/main-about.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@Injectable({
  providedIn: 'root',
})
export class MainRenderService {

  public render = {
    'main-header': MainHeaderComponent,
    'main-project': MainProjectComponent,
    'main-projects': MainProjectsComponent,
    'main-articles': MainArticlesComponent,
    'main-about': MainAboutComponent,
  };

  constructor() {
  }

}
