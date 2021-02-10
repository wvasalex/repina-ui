import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { MainModule } from './main/main.module';
import { ProjectsModule } from './projects/projects.module';
import { JournalModule } from './journal/journal.module';
import { AgencyModule } from './agency/agency.module';
import { ContactsModule } from './contacts/contacts.module';
import { ServicesModule } from './services/services.module';
import { API_BASE_CONFIG } from '@shared/services/api/api.model';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from '@shared/services/session/session.module';
import { NotfoundModule } from '@shared/notfound/notfound.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'repina'}),
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false},
    ),*/
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
