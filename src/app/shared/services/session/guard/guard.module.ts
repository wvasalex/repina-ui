import { NgModule } from '@angular/core';
import { SessionGuardService } from './session-guard.service';
import { SessionOffGuardService } from './session-off-guard.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

@NgModule({
  providers: [
    SessionGuardService,
    SessionOffGuardService,
    CanDeactivateGuardService
  ]
})
export class GuardModule { }
