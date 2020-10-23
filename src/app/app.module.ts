import { NgModule }       from '@angular/core';
import { BrowserModule, HammerModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { MainModule } from './main/main.module';
import { ProjectsModule } from './projects/projects.module';
import { JournalModule } from './journal/journal.module';
import { AgencyModule } from './agency/agency.module';
import { ContactsModule } from './contacts/contacts.module';
import { ServicesModule } from './services/services.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_BASE_CONFIG } from '@shared/services/api/api.model';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from '@shared/services/session/session.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'repina'}),
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    /*HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false},
    ),*/

    AuthModule,
    AgencyModule,
    ContactsModule,
    SharedModule,
    PageModule,
    MainModule,
    ProjectsModule,
    JournalModule,
    ServicesModule,
    SessionModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [
  ],
  providers: [
    {
      provide: API_BASE_CONFIG,
      useValue: {
        host: '',
        base: '/api/v1',
      }
    }
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
