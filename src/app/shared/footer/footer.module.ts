import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@shared/footer/footer.component';
import { SharedModule } from '@shared/components/shared.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { MatButtonModule } from '@angular/material/button';
import { FooterSocialComponent } from './footer-social/footer-social.component';
import { FooterLeftComponent } from '@shared/footer/footer-left/footer-left.component';
import { SocialItemComponent } from './footer-social/social-item/social-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  ],
})
export class FooterModule {
}
