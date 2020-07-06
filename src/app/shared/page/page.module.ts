import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { MenuModule } from '../menu/menu.module';
import { ObserversModule } from '@angular/cdk/observers';
import { PaddingComponent } from './padding/padding.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../components/shared.module';
import { RequestComponent } from './request/request.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    PageComponent,
    PaddingComponent,
    FooterComponent,
    RequestComponent,
    HeaderComponent,
  ],
  exports: [
    PageComponent,
    PaddingComponent,
    RequestComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ObserversModule,
    MenuModule,
    SharedModule,
  ],
})
export class PageModule { }
