import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

export class ResolverService<M> implements Resolve<M> {
  public router;
  public service;

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.service.resolve(route.paramMap.get('id'))
      .pipe(
        catchError((error) => {
          if (this.router) {
            this.router.navigate(['/404']);
          }

          throw error;
        })
      );
  }
}
