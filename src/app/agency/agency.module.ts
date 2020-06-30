import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { PageModule } from '../shared/page/page.module';
import { GridModule } from '../shared/grid/grid.module';
import { SharedModule } from '../shared/components/shared.module';
import { AgencyAwardsComponent } from './agency-awards/agency-awards.component';
import { AgencyTeamComponent } from './agency-team/agency-team.component';
import { AgencyFeedbackComponent } from './agency-feedback/agency-feedback.component';
import { AgencyCustomersComponent } from './agency-customers/agency-customers.component';

@NgModule({
  declarations: [AgencyComponent, AgencyAwardsComponent, AgencyTeamComponent, AgencyFeedbackComponent, AgencyCustomersComponent],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    PageModule,
    GridModule,
    SharedModule,
  ]
})
export class AgencyModule { }
