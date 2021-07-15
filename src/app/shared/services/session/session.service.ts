import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api/api.service';
import { SessionStateService } from './session-state.service';
import { Session } from '@shared/services/session/session.model';
import { Observable } from 'rxjs';
import { StrMap } from '@shared/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SessionService  {

  constructor(
    public api: ApiService,
    private sessionState: SessionStateService,
    ) {
  }

  public toggle(): void {
    if (this.isValid()) {
      this.destroy();
    } else {
      this.create('bbe4b99daee3043a52c7dcee27dfdda0acc7332d');
    }
  }

  public signIn(data: {phone: string, password: string}): Observable<Session> {
    return this.api.postStream('/tokens/', data)
      .pipe(
        map((result: StrMap<string>) => {
          return this.sessionState.setState({
            valid: true,
            token: result.key,
          });
        }),
      );
  }

  public signUp(data): Observable<any> {
    return this.api.postStream('/registration/', data);
  }

  public restorePassword(data): Observable<any> {
    return this.api.postStream('/set_password/', data);
  }

  public confirmPhone(phone: string, token?: string) {
    const data: StrMap<string> = {phone};
    if (token) {
      data.token = token;
    }

    return this.api.postStream('/contact_verifications/', data);
  }

  public create(token: string): void {
    this.sessionState.setState({
      valid: true,
      token,
    });
  }

  public destroy(): Promise<void> {
    this.sessionState.setState({
      valid: false,
      token: '',
    });

    return Promise.resolve();
  }

  public isValid(): boolean {
    return !!this.sessionState.token;
  }

  public check(): Promise<boolean> {
    return Promise.resolve(this.isValid());
  }

  public isAdmin(): boolean {
    return this.sessionState.token === 'bbe4b99daee3043a52c7dcee27dfdda0acc7332d';
  }

}
