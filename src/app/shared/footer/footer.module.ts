import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '@shared/footer/footer.component';
import { SharedModule } from '@shared/components/shared.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { FooterSocialComponent } from './footer-social/footer-social.component';
import { FooterLeftComponent } from '@shared/footer/footer-left/footer-left.component';
import { SocialItemComponent } from './footer-social/social-item/social-item.component';
import { FooterContactsComponent } from './footer-contacts/footer-contacts.component';
import { FooterBreadcrumbsComponent } from './footer-breadcrumbs/footer-breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BlocksModule,
    MatButtonModule,
    DragDropModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
  ],
  declarations: [
    FooterComponent,
    FooterLeftComponent,
    FooterSocialComponent,
    SocialItemComponent,
    FooterContactsComponent,
    FooterBreadcrumbsComponent,
  ],
})
export class FooterModule {
}
