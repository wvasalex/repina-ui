import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { NotfoundRoutingModule } from './notfound-routing.module';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageModule,
    NotfoundRoutingModule,
  ],
})
export class NotfoundModule { }
