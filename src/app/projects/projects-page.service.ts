import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';
import { ContentBlock } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class ProjectsPageService extends RestService {

  public config: ApiConfig = {
    path: '/project_content_blocks/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public getHeader(): Observable<ContentBlock> {
    return this.get({project__isnull: true})
      .pipe(
        map((blocks: ContentBlock[]) => {
          return blocks.find((block) => {
            return block.block_type === 'projects-header';
          });
        }),
      );
  }

}
