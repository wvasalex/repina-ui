import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { StrMap } from '@shared/types';
import { Article } from './journal.model';
import { ArticleHeaderComponent } from './article/article-header/article-header.component';
import { ArticlePartComponent } from './article/article-part/article-part.component';
import { ArticleAuthorComponent } from './article/article-author/article-author.component';
import { ArticleImageComponent } from './article/article-image/article-image.component';
import { ArticleTextComponent } from './article/article-text/article-text.component';
import { ArticleQuoteComponent } from './article/article-quote/article-quote.component';
import { ArticleVideoComponent } from './article/article-video/article-video.component';
import { BlockBlankComponent } from '@shared/blocks/block-blank/block-blank.component';

@Injectable({
  providedIn: 'root'
})
export class JournalService extends RestService {
  public config: ApiConfig = {
    path: '/blogs/',
  };

  public render = {
    'blank': BlockBlankComponent,
    'article-header': ArticleHeaderComponent,
    'article-part': ArticlePartComponent,
    'article-author': ArticleAuthorComponent,
    'article-image': ArticleImageComponent,
    'article-text': ArticleTextComponent,
    'article-quote': ArticleQuoteComponent,
    'article-video': ArticleVideoComponent,
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
