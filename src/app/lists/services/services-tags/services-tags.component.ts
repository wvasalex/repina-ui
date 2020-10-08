import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListsService } from '../../lists.service';
import { ServicesTagsService } from '../../../services/services-tags.service';

@Component({
  selector: 'r-service-tags',
  templateUrl: './services-tags.component.html',
  styleUrls: ['./services-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ListsService,
      useClass: ServicesTagsService,
    },
  ],
})
export class ServicesTagsComponent {

}
