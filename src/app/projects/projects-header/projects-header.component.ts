import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ActivatedRoute } from '@angular/router';
import { ServicesTagsService } from '../../services/services-tags.service';

@Component({
  selector: 'r-projects-header',
  templateUrl: './projects-header.component.html',
  styleUrls: ['./projects-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsHeaderComponent extends BaseBlock {

  public tagName$: Observable<string> = combineLatest([
    this.activatedRoute.params,
    this.servicesTagsService.tags$,
  ]).pipe(
    map(([params, tags]) => {
      if (!tags?.length || !params.url) {
        return;
      }

      return tags.find((tag) => tag.meta?.key === params.url)?.label;
    }),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesTagsService: ServicesTagsService,
  ) {
    super();
  }


}
