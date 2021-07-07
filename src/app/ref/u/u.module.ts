import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { URoutingModule } from './u-routing.module';
import { AboutModule } from '../about/about.module';
import { InfoModule } from '../info/info.module';
import { StatModule } from '../stat/stat.module';
import { PayModule } from '../pay/pay.module';
import { UComponent } from './u.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '@shared/components/shared.module';


@NgModule({
  declarations: [
    UComponent,
    MenuComponent
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
})
export class UModule { }
