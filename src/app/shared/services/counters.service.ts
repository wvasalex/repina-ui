import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const fbq;

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  init() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this._ensureRoistat();
        this._ensureGtag();
        this._ensureFb();
      }, 2000);
    }
  }

  private _ensureGtag() {
    (function (w, d, s, l, i) {
      if (d.getElementById('gtm')) {
        return;
      }

      w[l] = w[l] || [];
      w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s) as any,
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.id = 'gtm';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-5BT3MQN');
  }

  private _ensureFb() {
    (function (f, b, e, v, n, t, s) {
      if (b.getElementById('fbpixel')) {
        return;
      }

      //if (f.fbq) return;
      n = f['fbq'] = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f['_fbq']) f['_fbq'] = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      t.id = 'fbpixel';
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', '924768694246682');
    fbq('track', 'PageView');
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
