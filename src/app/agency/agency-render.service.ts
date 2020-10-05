import { Injectable } from '@angular/core';
import { AgencyPrimaryComponent } from './agency-primary/agency-primary.component';
import { AgencyAchievementsComponent } from './agency-achievements/agency-achievements.component';
import { AgencyRepinaComponent } from './agency-repina/agency-repina.component';
import { AgencyTeamComponent } from './agency-team/agency-team.component';
import { AgencyAwardsComponent } from './agency-awards/agency-awards.component';
import { AgencyFeedbackComponent } from './agency-feedback/agency-feedback.component';
import { AgencyImagesComponent } from './agency-images/agency-images.component';
import { AgencyCustomersComponent } from './agency-customers/agency-customers.component';
import { AgencyMediaComponent } from './agency-media/agency-media.component';
import { AgencyGalleryComponent } from './agency-gallery/agency-gallery.component';
import { AgencyImageComponent } from './agency-image/agency-image.component';

@Injectable({
  providedIn: 'root'
})
export class AgencyRenderService {
  public render = {
    'agency-primary': AgencyPrimaryComponent,
    'agency-achievements': AgencyAchievementsComponent,
    'agency-repina': AgencyRepinaComponent,
    'agency-team': AgencyTeamComponent,
    'agency-awards': AgencyAwardsComponent,
    'agency-feedback': AgencyFeedbackComponent,
    'agency-images': AgencyImagesComponent,
    'agency-customers': AgencyCustomersComponent,
    'agency-media': AgencyMediaComponent,
    'agency-gallery': AgencyGalleryComponent,
    'agency-image': AgencyImageComponent,
  };

  constructor() { }
}
