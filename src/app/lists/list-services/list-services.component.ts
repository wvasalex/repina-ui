import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicesService } from '../../services/services.service';
import { ListsService } from '../lists.service';
import { Service, SERVICE_TYPES } from '../../services/services.model';

@Component({
  selector: 'r-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListServicesComponent implements OnInit {

  public services$: Observable<Service[]> = this.servicesService.get()
    .pipe(map((services: Service[]) => {
      return services.sort((a: Service, b: Service) => {
        if (a.title === b.title) {
          return 0;
        }
        return a.title > b.title ? 1 : -1;
      });
    }));

  public $type = SERVICE_TYPES.reduce((result, item) => {
    result[item.value] = item.label;
    return result;
  }, {});

  constructor(
    private servicesService: ServicesService,
    public listsService: ListsService,
  ) {
  }

  ngOnInit(): void {
  }

}
