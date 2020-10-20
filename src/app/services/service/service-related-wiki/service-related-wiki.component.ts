import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ServicesService } from '../../services.service';
import { Observable } from 'rxjs';
import { Service, ServiceScope, ServiceTag } from '../../services.model';
import { StrMap } from '@shared/types';

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
    const service: Service = this.data.service as Service;

    const query: StrMap<number | string> = {
      service_type: 'brand_wiki',
      per_page: 4,
    };

    if (service.tag) {
      query.tag_id = (service.tag as ServiceTag).id;
    }
    if (service.activity_scope) {
      query.activity_scope_id = (service.activity_scope as ServiceScope).id;
    }

    this.related$ = this.servicesService.get(query);
  }

}
