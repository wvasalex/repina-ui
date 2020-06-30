import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToasterComponent } from './toaster.component';
import { ToasterService } from './toaster.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  exports: [
    ToasterComponent
  ],
  declarations: [
    ToasterComponent
  ],
  providers: [
    ToasterService
  ]
})
export class ToasterModule { }
