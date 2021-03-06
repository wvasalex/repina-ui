import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { environment } from '../environments/environment';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { API_BASE_CONFIG } from '@shared/services/api/api.model';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
  ],
  providers: [
    {
      provide: API_BASE_CONFIG,
      useValue: {
        host: environment.host,
        base: '/api/v1',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
