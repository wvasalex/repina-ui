import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ObserversModule } from '@angular/cdk/observers';
import { FooterModule } from '@shared/footer/footer.module';
import { SeoModule } from '@shared/seo/seo.module';
import { PageComponent } from './page.component';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../components/shared.module';
import { RequestComponent } from './request/request.component';
import { HeaderComponent } from './header/header.component';
import { RequestFeedbackComponent } from './request-feedback/request-feedback.component';

@NgModule({
  declarations: [
    PageComponent,
    RequestComponent,
    HeaderComponent,
    RequestFeedbackComponent,
  ],
  exports: [
    PageComponent,
    RequestComponent,
  ],
  imports: [
    CommonModule,
    ObserversModule,
    MenuModule,
    FooterModule,
    SharedModule,
    SeoModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class PageModule { }
