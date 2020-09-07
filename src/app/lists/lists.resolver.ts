import { Injectable } from '@angular/core';
import { ResolverService } from '@shared/services/api/resolver.service';
import { ListsService } from './lists.service';
import { ContentListItem } from './lists.model';

@Injectable({
  providedIn: 'root',
})
export class ListsResolver extends ResolverService<ContentListItem[]> {
  constructor(public service: ListsService) {
    super();
  }
}
