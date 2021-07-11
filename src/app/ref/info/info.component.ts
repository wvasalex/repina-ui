import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContentBlock } from '@shared/types';
import { AgencyService } from '../../agency/agency.service';

@Component({
  selector: 'r-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {

  public gallery$: Observable<ContentBlock> = this.agencyService.getGallery();

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
  }

}
