import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { API_BASE_CONFIG } from '@shared/services/api/api.model';
import { SessionModule } from '@shared/services/session/session.module';
import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'repina'}),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    CookieModule.forRoot(),
    SharedModule,
    PageModule,
    AppRoutingModule,
    MainModule,
    SessionModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [],
  providers: [
    {
      provide: API_BASE_CONFIG,
      useValue: {
        host: environment.production ? 'https://repinabranding.ru' : '',
        base: '/api/v1',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
