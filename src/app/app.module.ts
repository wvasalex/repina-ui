import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
import { NotfoundModule } from '@shared/notfound/notfound.module';
import { MainModule } from './main/main.module';
import { ProjectsModule } from './projects/projects.module';
import { JournalModule } from './journal/journal.module';
import { AgencyModule } from './agency/agency.module';
import { ContactsModule } from './contacts/contacts.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'repina'}),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    SharedModule,
    PageModule,
    NotfoundModule,
    AuthModule,
    AgencyModule,
    ContactsModule,
    ProjectsModule,
    JournalModule,
    AppRoutingModule,
    MainModule,
    ServicesModule,
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
        host: '',
        base: '/api/v1',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';

    console.log(`Running ${platform} with appId=${appId}`);
  }
}
