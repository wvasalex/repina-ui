import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';
import { SitemapComponent } from './sitemap.component';
import { SitemapService } from './sitemap.service';
import { PageModule } from '@shared/page/page.module';
import { SharedModule } from '@shared/components/shared.module';

@NgModule({
  declarations: [
    SitemapComponent,
  ],
  imports: [
    CommonModule,
    SitemapRoutingModule,
    PageModule,
    SharedModule,
  ],
  providers: [
    SitemapService,
  ],
})
export class SitemapModule {
}
