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

}
