import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';

export class ResolverService<M> implements Resolve<M> {
  public router;
  public service;

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const uid = route.paramMap.get('id');
    if (typeof window === 'undefined' && uid.indexOf('_') === 0) {
      return this.router.navigate(['/404']);
    }

    return this.service.resolve(route.paramMap.get('id'))
      .pipe(
        catchError((error) => {
          if (this.router) {
            this.router.navigate(['/404']);
          }

          throw error;
        }),
      );
  }
}
