import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/components/shared.module';
import { PageModule } from '../shared/page/page.module';
import { GridModule } from '../shared/grid/grid.module';
import { JournalModule } from '../journal/journal.module';
import { AboutComponent } from './about/about.component';
import { SphereComponent } from './sphere/sphere.component';

@NgModule({
  declarations: [
    MainComponent,
    AboutComponent,
    SphereComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PageModule,
    GridModule,
    JournalModule,
  ],
})
export class MainModule { }
