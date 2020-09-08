import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentListItem } from '../../lists/lists.model';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'r-agency-media',
  templateUrl: './agency-media.component.html',
  styleUrls: ['./agency-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyMediaComponent implements OnInit {
  public media$: Observable<ContentListItem[]> = this.agencyService.getMedia();

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
  }

}
