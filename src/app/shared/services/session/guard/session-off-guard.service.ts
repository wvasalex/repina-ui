import { Injectable } from '@angular/core';
import { AbstractGuardService } from './abstract-guard.service';
import { Session } from '../session.model';

@Injectable()
export class SessionOffGuardService extends AbstractGuardService {
  protected check(hasSession: boolean): boolean {
    return true;
  }
}
