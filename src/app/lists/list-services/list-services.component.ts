import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { ServicesService } from '../../services/services.service';
import { ListsService } from '../lists.service';
import { Service, SERVICE_TYPES } from '../../services/services.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ContentListItem } from '../lists.model';

@Component({
  selector: 'r-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListServicesComponent implements OnInit {

  public types$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  public services$: Observable<Service[]> = this.types$.pipe(
    switchMap((types: string[]) => {
      return this.servicesService.get({
        service_type__in: types.join(','),
      });
    }),
    map((services: Service[]) => {
      return this._sort(services);
    }),
    tap((services: Service[]) => {
      this._services = services;
    }),
  );

  public $type = SERVICE_TYPES.reduce((result, item) => {
    result[item.value] = item.label;
    return result;
  }, {});

  private _services: Service[];

  constructor(
    private servicesService: ServicesService,
  ) {
  }

  ngOnInit(): void {
  }

  public $typeChange(e: MatButtonToggleChange) {
    this.types$.next(e.value);
  }

  public $sort(event: CdkDragDrop<ContentListItem>) {
    this.servicesService.move(this._services, event.previousIndex, event.currentIndex);
  }

  private _sort = (services: Service[]) => {
    if (this.types$.value.length === 1 && this.types$.value[0] === 'complex') {
      return services.sort((a: Service, b: Service) => {
        return a.position - b.position;
      });
    }

    return services.sort((a: Service, b: Service) => {
      if (a.title === b.title) {
        return 0;
      }
      return a.title > b.title ? 1 : -1;
    });
  }

}
