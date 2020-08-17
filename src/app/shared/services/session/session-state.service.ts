import { Injectable } from '@angular/core';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStateService {
  public token: string;
  public valid: boolean = false;

  private storage: Storage;

  constructor() {
    this.storage = typeof window !== 'undefined' && window.sessionStorage
    if (this.storage) {
      this.token = this.storage.getItem('auth.token');
    }
  }

  public setState(session: Session): Session {
    this.token = session.token;
    this.valid = !!this.token;

    if (this.storage) {
      if (!this.token) {
        this.storage.removeItem('auth.token');
      } else {
        this.storage.setItem('auth.token', this.token);
      }
    }

    return session;
  }
}
