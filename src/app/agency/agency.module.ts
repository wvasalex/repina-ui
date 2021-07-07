import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { PageModule } from '@shared/page/page.module';
import { GridModule } from '@shared/grid/grid.module';
import { SharedModule } from '@shared/components/shared.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { AgencyFeedbackComponent } from './agency-feedback/agency-feedback.component';
import { AgencyCustomersComponent } from './agency-customers/agency-customers.component';
import { AgencyMediaComponent } from './agency-media/agency-media.component';
import { AgencyPrimaryComponent } from './agency-primary/agency-primary.component';
import { AgencyAchievementsComponent } from './agency-achievements/agency-achievements.component';
import { AgencyRepinaComponent } from './agency-repina/agency-repina.component';
import { AgencyTeamComponent } from './agency-team/agency-team.component';
import { AgencyAwardsComponent } from './agency-awards/agency-awards.component';
import { AgencyImagesComponent } from './agency-images/agency-images.component';
import { AgencyAchievementComponent } from './agency-achievements/agency-achievement/agency-achievement.component';
import { AgencyPrimaryTextComponent } from './agency-primary/agency-primary-text/agency-primary-text.component';
import { AgencyEditorComponent } from './agency-editor/agency-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { AgencyGalleryComponent } from './agency-gallery/agency-gallery.component';
import { AgencyImageComponent } from './agency-image/agency-image.component';
import { AgencyHeaderComponent } from './agency-header/agency-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgencyComponent,
    AgencyPrimaryComponent,
    AgencyFeedbackComponent,
    AgencyCustomersComponent,
    AgencyMediaComponent,
    AgencyAchievementsComponent,
    AgencyRepinaComponent,
    AgencyTeamComponent,
    AgencyAwardsComponent,
    AgencyImagesComponent,
    AgencyAchievementComponent,
    AgencyPrimaryTextComponent,
    AgencyEditorComponent,
    AgencyGalleryComponent,
    AgencyImageComponent,
    AgencyHeaderComponent,
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    PageModule,
    GridModule,
    SharedModule,
    BlocksModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [
    AgencyAchievementsComponent,
    AgencyAwardsComponent,
    AgencyCustomersComponent,
    AgencyGalleryComponent,
  ],
})
export class AgencyModule {
}
