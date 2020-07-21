import { Injectable } from '@angular/core';
import { ngxLocalStorage } from 'ngx-localstorage';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStateService {
  @ngxLocalStorage({}) token: string;
  public valid: boolean = false;

  constructor() {
  }

  public setState(session: Session): Session {
    this.token = session.token;
    this.valid = !!this.token;
    return session;
  }
}
