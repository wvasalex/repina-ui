import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseBlock } from '@shared/blocks/block.component';
import { ContentListItem } from '../../lists/lists.model';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'r-agency-customers',
  templateUrl: './agency-customers.component.html',
  styleUrls: ['./agency-customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyCustomersComponent extends BaseBlock {
  public customers$: Observable<ContentListItem[]> = this.agencyService.getCustomers();

  constructor(private agencyService: AgencyService) {
    super();
  }

  ngOnInit(): void {
  }

}
