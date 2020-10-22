import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';
import { Service, ServiceScope, ServiceTag } from '../../../services/services.model';
import { ServicesService } from '../../../services/services.service';
import * as f from 'fast-average-color';
import { StrMap } from '@shared/types';
import { Observable } from 'rxjs';
import { Project } from '@shared/projects/projects.model';

@Component({
  selector: 'r-project-root',
  templateUrl: './project-root.component.html',
  styleUrls: ['./project-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRootComponent extends BaseBlock implements OnInit {

  public services$: Observable<Service[]>;

  /*= this.servicesService.get()
    .pipe(map((services: Service[]) => {
      return services.map((service: Service) => {
        return {
          value: service.slug,
          label: service.title,
        };
      });
    }));*/

  constructor(private servicesService: ServicesService) {
    super();
  }

  public ngOnInit(): void {
    const project: Project = this.data?.project as Project;

    const query: StrMap<number> = {
      per_page: 4,
    };

/*    if (service.tag) {
      query.tag_id = (service.tag as ServiceTag).id;
    }*/
    if (project.activity_scope) {
      query.activity_scope_id = (project.activity_scope as ServiceScope).id;
    }

    this.services$ = this.servicesService.get(query);
  }

  /*public $servicesChanged(services: SelectOption[]) {
    this.props.services = JSON.stringify(services);
  }

  public $parseServices(servicesJson: string): SelectOption[] {
    return servicesJson ?
      JSON.parse(servicesJson) :
      [];
  }
*/

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
