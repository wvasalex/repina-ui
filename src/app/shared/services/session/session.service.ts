import { Injectable } from '@angular/core';
import { SessionStateService } from './session-state.service';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private sessionState: SessionStateService) {
  }

  public create(): void {
    this.sessionState.setState({
      valid: true,
      token: 'bbe4b99daee3043a52c7dcee27dfdda0acc7332d',
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
}
