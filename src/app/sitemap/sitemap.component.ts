import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SitemapService } from './sitemap.service';
import { SitemapItem } from './sitemap.model';

@Component({
  selector: 'r-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitemapComponent {

  public sitemap$: Observable<SitemapItem[]> = this.sitemapService.getFlatten();

  constructor(
    private sitemapService: SitemapService,
  ) {
  }

}
