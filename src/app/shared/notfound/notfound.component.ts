import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '@shared/menu/menu.service';
import { ContentBlock, ContentElement } from '@shared/types';
import { map } from 'rxjs/operators';

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
    private menuService: MenuService,
  ) {
  }

  ngOnInit(): void {
  }

}
