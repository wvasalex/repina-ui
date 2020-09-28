import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { API_BASE_CONFIG } from './shared/services/api/api.model';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      provide: API_BASE_CONFIG,
      useValue: {
        host: 'http://5.63.158.46',
        base: '/api/v1',
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
