import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionStateService } from './index';

@Injectable()
export class SessionInterceptorService implements HttpInterceptor {
  constructor(private sessionState: SessionStateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.sessionState.token;

    let auth: HttpRequest<any>;
    if (token) {
      auth = req.clone({
        headers: req.headers.set('Authorization', 'Token ' + token),
      });
    }

    return next.handle(auth || req);
  }
}
