import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContentElement } from '@shared/types';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { BreadcrumbItem } from '@shared/footer/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends RestService {

  public config: ApiConfig = {
    path: '/menu_footer_blocks/',
  };

  public breadcrumbs$: BehaviorSubject<BreadcrumbItem[]> = new BehaviorSubject<BreadcrumbItem[]>([]);

  constructor(public api: ApiService) {
    super();
  }

  public enabled(elements: ContentElement[]): ContentElement[] {
    return elements.filter((element: ContentElement) => {
      return element.props.enabled && !element._destroy;
    });
  }

  public setBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
    this.breadcrumbs$.next([
      {
        href: '/',
        text: 'Repina',
      },
      ...breadcrumbs
    ]);
  }

}
