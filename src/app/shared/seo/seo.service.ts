import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { Observable } from 'rxjs';
import { SeoData } from '@shared/seo/seo.model';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { StrMap } from '@shared/types';

@Injectable({
  providedIn: 'root',
})
export class SeoService extends RestService {

  public config: ApiConfig = {
    path: '/seo_contents/',
  };

  constructor(@Inject(DOCUMENT) private doc,
              private title: Title,
              public api: ApiService,
              private meta: Meta) {
    super();
  }

  public setTitle(title: string) {
    this.title.setTitle(title);
  }

  public updateTag(name: string, content: string) {
    if (content === null) {
      this.meta.removeTag('name="' + name + '"');
      return;
    }

    this.meta.updateTag({
      name,
      content: content || '',
    });
  }

  public getByUrl(url: string): Observable<SeoData> {
    return this.get({ model_name: url })
      .pipe(
        map((seoContent: SeoData[]) => {
          return seoContent[0];
        }),
      );
  }

  public setPaginated(page: number, title: string, canonical: string) {
    if (page > 1) {
      title += ` - Страница ${page}`;
      this.updateTag('description', null);
    } else {
      canonical = null;
    }

    this.setTitle(title);
    this._setLink('canonical', { rel: 'canonical', href: canonical });
  }

  private _setLink(id: string, attrs: StrMap<string>) {
    const head = this.doc.head;
    let el = head?.querySelector('#' + id);

    if (attrs.href === null) {
      el?.parentNode.removeChild(el);
      return;
    }

    if (!el) {
      el = this.doc.createElement('link');
      el.id = id;
      head.appendChild(el);
    }

    for(let attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        el.setAttribute(attr, attrs[attr] || '');
      }
    }
  }

}
