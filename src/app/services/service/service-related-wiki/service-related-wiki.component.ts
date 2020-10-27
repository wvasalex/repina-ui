import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StrMap } from '@shared/types';
import { ServicesService } from '../../services.service';
import { Service, ServiceScope, ServiceTag } from '../../services.model';

@Component({
  selector: 'r-service-related-wiki',
  templateUrl: './service-related-wiki.component.html',
  styleUrls: ['./service-related-wiki.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceRelatedWikiComponent extends BaseBlock implements OnInit {

  public related$: Observable<Service[]>;

  constructor(private servicesService: ServicesService) {
    super();
  }

  public ngOnInit(): void {
    const service: Service = this.data?.service as Service;

    if (!service) {
      return;
    }

    const query: StrMap<number | string> = {
      service_type: 'brand_wiki',
      per_page: 5,
    };

    if (service.tag) {
      query.tag_id = (service.tag as ServiceTag).id;
    }
    if (service.activity_scope) {
      query.activity_scope_id = (service.activity_scope as ServiceScope).id;
    }

    this.related$ = this.servicesService.get(query).pipe(
      map((related: Service[]) => {
        return related.filter((item: Service) => {
          return item.id !== service.id;
        }).slice(0, 5);
      }),
    );
  }

}
