import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { Observable } from 'rxjs';
import { SeoData } from '@shared/seo/seo.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService extends RestService {

  public config: ApiConfig = {
    path: '/seo_contents/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public getByUrl(url: string): Observable<SeoData> {
    return this.get()
      .pipe(
        map((seoContent: SeoData[]) => {
          return seoContent[0];
        }),
      );
  }

}
