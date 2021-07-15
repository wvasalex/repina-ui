import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { RefSharedModule } from '../ref-shared/ref-shared.module';
import { RefAgencyAchievementComponent } from './ref-agency-achievement/ref-agency-achievement.component';
import { AgencyModule } from '../../agency/agency.module';
import { RefAgencyPortfolioComponent } from './ref-agency-portfolio/ref-agency-portfolio.component';
import { SharedModule } from '@shared/components/shared.module';


@NgModule({
  declarations: [
    AboutComponent,
    RefAgencyAchievementComponent,
    RefAgencyPortfolioComponent
  ],
  imports: [
    CommonModule,
    RefSharedModule,
    AgencyModule,
    SharedModule,
  ],
})
export class AboutModule { }
