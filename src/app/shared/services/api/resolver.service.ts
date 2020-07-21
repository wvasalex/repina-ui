import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

export class ResolverService<M> implements Resolve<M> {
  public service;

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.service.resolve(route.paramMap.get('id'));
  }
}
