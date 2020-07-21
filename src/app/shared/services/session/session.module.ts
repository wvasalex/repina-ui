import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SessionGuardService } from './guard/session-guard.service';
import { SessionOffGuardService } from './guard/session-off-guard.service';
import { CanDeactivateGuardService } from './guard/can-deactivate-guard.service';
import { SessionInterceptorService } from '@shared/services/session/session-interceptor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    SessionGuardService,
    SessionOffGuardService,
    CanDeactivateGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptorService,
      multi: true,
    },
  ]
})
export class SessionModule { }
