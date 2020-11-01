import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { SeoComponent } from './seo.component';
import { SharedModule } from '../components/shared.module';

@NgModule({
  declarations: [
    SeoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    SeoComponent,
  ],
})
export class SeoModule {
}
