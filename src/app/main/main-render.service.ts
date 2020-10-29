import { Injectable } from '@angular/core';
import { MainProjectComponent } from './main-project/main-project.component';
import { MainProjectsComponent } from './main-projects/main-projects.component';
import { MainArticlesComponent } from './main-articles/main-articles.component';

@Injectable({
  providedIn: 'root'
})
export class MainRenderService {

  public render = {
    'main-project': MainProjectComponent,
    'main-projects': MainProjectsComponent,
    'main-articles': MainArticlesComponent,
  };

  constructor() { }

}
