import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListsService } from '../../lists.service';
import { ServicesScopesService } from '../../../services/services-scopes.service';

@Component({
  selector: 'r-services-scopes',
  templateUrl: './services-scopes.component.html',
  styleUrls: ['./services-scopes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ListsService,
      useClass: ServicesScopesService,
    },
  ],
})
export class ServicesScopesComponent implements OnInit {

  constructor(private listsService: ListsService) {
  }

  ngOnInit(): void {
    this.listsService.resolve('services-scopes').subscribe();
  }

}
