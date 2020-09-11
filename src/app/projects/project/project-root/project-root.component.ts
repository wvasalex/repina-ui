import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ServicesService } from '../../../services/services.service';
import { map } from 'rxjs/operators';
import { Service } from '../../../services/services.model';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRootComponent extends BaseBlock {
  public services$ = this.servicesService.get()
    .pipe(map((services: Service[]) => {
      return services.map((service: Service) => {
        return {
          value: service.slug,
          label: service.title,
        };
      });
    }));

  constructor(private servicesService: ServicesService) {
    super();
  }

  public $servicesChanged(services: SelectOption[]) {
    this.props.services = JSON.stringify(services);
  }

  public $parseServices(servicesJson: string): SelectOption[] {
    return servicesJson ?
      JSON.parse(servicesJson) :
      [];
  }
}
