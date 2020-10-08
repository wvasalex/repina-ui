import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListsService } from '../../lists.service';
import { ServicesGroupsService } from '../../../services/services-groups.service';

@Component({
  selector: 'r-services-groups',
  templateUrl: './services-groups.component.html',
  styleUrls: ['./services-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ListsService,
      useClass: ServicesGroupsService,
    },
  ],
})
export class ServicesGroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
