import { Injectable } from '@angular/core';
import { AgencyPrimaryComponent } from './agency-primary/agency-primary.component';
import { AgencyAchievementsComponent } from './agency-achievements/agency-achievements.component';
import { AgencyRepinaComponent } from './agency-repina/agency-repina.component';
import { AgencyTeamComponent } from './agency-team/agency-team.component';
import { AgencyAwardsComponent } from './agency-awards/agency-awards.component';
import { AgencyFeedbackComponent } from './agency-feedback/agency-feedback.component';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  public render = {
    'agency-primary': AgencyPrimaryComponent,
    'agency-achievements': AgencyAchievementsComponent,
    'agency-repina': AgencyRepinaComponent,
    'agency-team': AgencyTeamComponent,
    'agency-awards': AgencyAwardsComponent,
    'agency-feedback': AgencyFeedbackComponent,
  };

  constructor() {
  }
}
