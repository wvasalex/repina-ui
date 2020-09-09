import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AgencyService } from '../agency.service';
import { Observable } from 'rxjs';
import { ContentListItem } from '../../lists/lists.model';

@Component({
  selector: 'r-agency-customers',
  templateUrl: './agency-customers.component.html',
  styleUrls: ['./agency-customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyCustomersComponent implements OnInit {
  public customers$: Observable<ContentListItem[]> = this.agencyService.getCustomers();

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
  }

}
