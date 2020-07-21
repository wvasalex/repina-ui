import { Injectable } from '@angular/core';
import { AbstractGuardService } from './abstract-guard.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuardService extends AbstractGuardService {
  protected check(hasSession: boolean): boolean {
    return hasSession;
  }
}
