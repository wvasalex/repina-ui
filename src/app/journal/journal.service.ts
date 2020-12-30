import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RestService } from '@shared/services/api/rest.service';
import { ApiService } from '@shared/services/api/api.service';
import { ApiConfig, PagedRequest, PagedResponse } from '@shared/services/api/api.model';
import { BlockBlankComponent } from '@shared/blocks/block-blank/block-blank.component';
import { StrMap } from '@shared/types';
import { Article } from './journal.model';
import { ArticleHeaderComponent } from './article/article-header/article-header.component';
import { ArticlePartComponent } from './article/article-part/article-part.component';
import { ArticleAuthorComponent } from './article/article-author/article-author.component';
import { ArticleImageComponent } from './article/article-image/article-image.component';
import { ArticleTextComponent } from './article/article-text/article-text.component';
import { ArticleQuoteComponent } from './article/article-quote/article-quote.component';
import { ArticleVideoComponent } from './article/article-video/article-video.component';
import { ArticleRequestComponent } from './article/article-request/article-request.component';
import { ArticleSubscribeComponent } from './article/article-subscribe/article-subscribe.component';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
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
    'article-request': ArticleRequestComponent,
    //'article-subscribe': ArticleSubscribeComponent,
  };

  public published$: Subject<Article[]> = new Subject<Article[]>();

  constructor(public api: ApiService) {
    super();
  }

  public patch<T>(body: StrMap<any> = {}) {
    if (typeof body.blog_tag === 'object' && body.blog_tag.id) {
      body.blog_tag = body.blog_tag.id;
    }

    return super.patch({
      ...body,
      id: body._slug || body.slug,
    });
  }

  public getPage<T>(req: PagedRequest): Observable<PagedResponse<T>> {
    req.per_page = 14;

    return super.getPage(req);
  }

  public groupArticles(articles: Article[], firstPage: boolean): Article[][] {
    const chunks = [];
    let line: number = 0;
    let chunk_size: number = firstPage ? 2 : 3;

    for (let i = 0; i < articles.length;) {
      const chunk: any[] = articles.slice(i, i + chunk_size);
      if (chunk.length < chunk_size) {
        while (chunk.length < chunk_size) {
          chunk.push({});
        }
      }
      chunks.push(chunk);

      i += chunk_size;

      line++;
      chunk_size = 3; //line % 2 == 0 ? 2 : 3;
    }

    return chunks;
  }

  public getLink(slug: string): string {
    return '/article/' + slug;
  }

  public getPublished() {
    this.get().pipe(
      map((articles: Article[]) => {
        return articles.filter((article: Article) => {
          return article.is_enabled;
        });
      }),
      tap((articles: Article[]) => {
        this.published$.next(articles);
      }),
    ).subscribe();
  }

}
