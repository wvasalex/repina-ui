import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContentBlock, ContentElement, StrMap } from '@shared/types';
import { RestService } from '../services/api/rest.service';
import { ApiConfig } from '../services/api/api.model';
import { ApiService } from '../services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends RestService {

  public config: ApiConfig = {
    path: '/menu_header_blocks/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public get(body?: StrMap<any>) {
    return super.get(body).pipe(
      map((blocks: ContentBlock[]) => {
        return blocks.find((block: ContentBlock) => {
          return block.block_type === 'menu';
        });
      }),
      map((menu: ContentBlock) => {
        menu.content_elements.sort((a, b) => {
          return a.position - b.position;
        });
        return menu;
      }),
    )
  }

  public enabled(elements: ContentElement[]): ContentElement[] {
    return elements.filter((element: ContentElement) => {
      return element.props.enabled;
    });
  }
}
