import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { PageModule } from '../shared/page/page.module';
import { GridModule } from '../shared/grid/grid.module';
import { SharedModule } from '../shared/components/shared.module';
import { TeamComponent } from './team/team.component';


@NgModule({
  declarations: [AgencyComponent, TeamComponent],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    PageModule,
    GridModule,
    SharedModule,
  ]
})
export class AgencyModule { }
