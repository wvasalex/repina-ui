import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';
import { Service } from '../../../services/services.model';
import { ServicesService } from '../../../services/services.service';
import * as f from 'fast-average-color';

@Component({
  selector: 'r-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRootComponent extends BaseBlock {

  /*public services$ = this.servicesService.get()
    .pipe(map((services: Service[]) => {
      return services.map((service: Service) => {
        return {
          value: service.slug,
          label: service.title,
        };
      });
    }));*/

  constructor(/*private servicesService: ServicesService*/) {
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

  public $upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this._getImageColor(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  private _getImageColor(src: string) {
    const fac = new f['default']();
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const color = fac.getColor(img);
      this.props.isDark = color.isDark;
    };
  }

}
