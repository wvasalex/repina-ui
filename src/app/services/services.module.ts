import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { SharedModule } from '../shared/components/shared.module';
import { PageModule } from '../shared/page/page.module';
import { ServicesPrimaryComponent } from './services-primary/services-primary.component';

@NgModule({
  declarations: [ServicesComponent, ServicesListComponent, ServicesPrimaryComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    PageModule,
  ]
})
export class ServicesModule { }
