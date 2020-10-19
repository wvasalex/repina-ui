import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { ListsService } from '../lists.service';
import { Observable } from 'rxjs';
import { Service, SERVICE_TYPES } from '../../services/services.model';

@Component({
  selector: 'r-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListServicesComponent implements OnInit {

  public services$: Observable<Service[]> = this.servicesService.get();

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
