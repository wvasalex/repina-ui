import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { GridModule } from '@shared/grid/grid.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServicesPrimaryComponent } from './services-primary/services-primary.component';
import { ServicesTechComponent } from './services-tech/services-tech.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

@NgModule({
  declarations: [ServicesComponent, ServicesPrimaryComponent, ServicesTechComponent, ServiceDetailComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    PageModule,
    GridModule,
    BlocksModule,
  ],
})
export class ServicesModule {
}
