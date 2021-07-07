import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/components/shared.module';
import { URoutingModule } from './u-routing.module';
import { AboutModule } from '../about/about.module';
import { InfoModule } from '../info/info.module';
import { StatModule } from '../stat/stat.module';
import { PayModule } from '../pay/pay.module';
import { UComponent } from './u.component';
import { RefMenuComponent } from './ref-menu/ref-menu.component';
import { RefDrawerComponent } from './ref-drawer/ref-drawer.component';

@NgModule({
  declarations: [
    UComponent,
    RefMenuComponent,
    RefDrawerComponent,
  ],
  imports: [
    CommonModule,
    URoutingModule,
    AboutModule,
    InfoModule,
    StatModule,
    PayModule,
    SharedModule,
  ],
  exports: [
  ],
})
export class UModule { }
