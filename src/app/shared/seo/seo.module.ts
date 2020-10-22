import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoComponent } from './seo.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SeoComponent,
  ],
  imports: [
    CommonModule,
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
