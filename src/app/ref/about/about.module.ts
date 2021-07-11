import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { RefSharedModule } from '../ref-shared/ref-shared.module';
import { RefAgencyAchievementComponent } from './ref-agency-achievement/ref-agency-achievement.component';
import { AgencyModule } from '../../agency/agency.module';


@NgModule({
  declarations: [
    AboutComponent,
    RefAgencyAchievementComponent
  ],
  imports: [
    CommonModule,
    RefSharedModule,
    AgencyModule,
  ],
})
export class AboutModule { }
