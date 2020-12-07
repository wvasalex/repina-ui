import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { SharedModule } from '../components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageModule,
    RouterModule,
  ],
})
export class NotfoundModule { }
