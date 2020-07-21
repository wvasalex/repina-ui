import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessionService } from '../';

@Injectable()
export abstract class AbstractGuardService implements CanActivate {
  constructor(private router: Router, private session: SessionService) {
  }

  canActivate(): Promise<boolean> {
    return this.session.check()
      .then((valid: boolean) => this.check(valid))
      .then((valid: boolean) => {
        if (!valid) {
          window.location.href = window.location.origin;
        }
        return valid;
      });
  }

  protected abstract check(hasSession: boolean): boolean;
}
