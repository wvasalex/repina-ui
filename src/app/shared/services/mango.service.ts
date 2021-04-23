import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MangoService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  public init() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this._ensureRoistat();

    this._ensureMango(() => {
      window['mgo'].getNumber('', function(e) {
        document.querySelectorAll('.mgo-number-12938').forEach(function(elem: HTMLElement) {
          elem.innerText = e.formattedNumber;
        });
      });
    });

    window['mgo']({
      calltracking: {
        id: 12938,
        elements: [{'selector': '.mgo-number-12938'}],
      },
    });
  }

  private _ensureMango(onload: Function) {
    (function (w, d, u, i, o, s, p) {
      if (d.getElementById(i)) {
        onload();
        return;
      }
      w['MangoObject'] = o;
      w[o] = w[o] || function () {
        (w[o].q = w[o].q || []).push(arguments)
      };
      w[o].u = u;
      w[o].t = new Date().getTime();
      s = d.createElement('script');
      s.async = 1;
      s.id = i;
      s.src = u;
      s.onload = onload;
      p = d.getElementsByTagName('script')[0];
      p.parentNode.insertBefore(s, p);
    }(window, document, '//widgets.mango-office.ru/widgets/mango.js', 'mango-js', 'mgo'));
  }

  private _ensureRoistat() {
    (function (w, d, s, h, id) {
      if (d.getElementById(id)) {
        return;
      }

      w['roistatProjectId'] = id;
      w['roistatHost'] = h;
      var p = d.location.protocol === 'https:' ? 'https://' : 'http://';
      var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? '/dist/module.js' : '/api/site/1.0/' + id + '/init?referrer=' + encodeURIComponent(d.location.href);
      var js = d.createElement(s) as any;
      js.id = id;
      js.async = 1;
      js.src = p + h + u;
      var js2 = d.getElementsByTagName(s)[0];
      js2.parentNode.insertBefore(js, js2);
    })(window, document, 'script', 'cloud.roistat.com', '3f1e65d3c2424c977d1c1167d8628a6e');
  }

}
