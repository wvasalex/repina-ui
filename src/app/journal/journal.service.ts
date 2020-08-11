import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { StrMap } from '@shared/types';
import { Article } from './journal.model';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends RestService {
  public config: ApiConfig = {
    path: '/blogs/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public patch<T>(body: StrMap<any> = {}) {
    return super.patch({...body, id: body.slug});
  }

  public groupArticles(articles: Article[]): Article[][] {
    const chunks = [];
    const chuck_size = 3;

    for(let i = 0; i < articles.length; i += chuck_size) {
      const chunk: any[] = articles.slice(i, i + chuck_size);
      if (chunk.length < chuck_size) {
        chunk.push(new Array(chuck_size - chunk.length));
      }
      chunks.push(chunk);
    }

    return chunks;
  }
}
