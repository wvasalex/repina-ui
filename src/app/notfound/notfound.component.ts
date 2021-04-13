import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { MenuService } from '@shared/menu/menu.service';
import { ContentBlock, ContentElement } from '@shared/types';

@Component({
  selector: 'r-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent implements OnInit {

  public menu$: Observable<ContentElement[]> = this.menuService.get().pipe(
    map((menu: ContentBlock) => {
      return this.menuService.enabled(menu.content_elements);
    }),
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) private response: Response,
    private menuService: MenuService,
  ) {
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId) && this.response) {
      this.response.status(404);
    }
  }

}
