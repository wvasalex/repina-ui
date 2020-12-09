import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as f from 'fast-average-color';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';
import { Service } from '../../../services/services.model';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'r-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRootComponent extends BaseBlock implements OnInit {

  public services$: Observable<SelectOption[]> = this.servicesService.get({
    service_type: 'single',
  })
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

  public ngOnInit(): void {
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
    console.log(file);
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
