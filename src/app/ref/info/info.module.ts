import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoComponent } from './info.component';
import { RefSharedModule } from '../ref-shared/ref-shared.module';
import { AgencyModule } from '../../agency/agency.module';
import { SharedModule } from '@shared/components/shared.module';


@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgencyModule,
    RefSharedModule,
  ],
})
export class InfoModule { }
