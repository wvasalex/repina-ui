import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ServicesListService } from '../services-list.service';

@Component({
  selector: 'r-service-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent implements OnInit {

  @Input() groupBy: 'tag_group' | 'parent' = 'tag_group';

  public services$;

  constructor(
    private servicesListService: ServicesListService,
  ) {
  }

  public ngOnInit(): void {
    this.services$ = this.servicesListService.groupBy(this.groupBy);
  }

}
