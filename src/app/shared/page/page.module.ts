import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';
import { PageComponent } from './page.component';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../components/shared.module';
import { RequestComponent } from './request/request.component';
import { HeaderComponent } from './header/header.component';
import { FooterModule } from '@shared/footer/footer.module';
import { SeoModule } from '@shared/seo/seo.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    PageComponent,
    RequestComponent,
    HeaderComponent,
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
  ],
})
export class PageModule { }
