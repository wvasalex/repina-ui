import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AgencyService } from '../../agency/agency.service';

@Component({
  selector: 'r-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent implements OnInit {

  constructor(private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.agencyService.get().subscribe((a) => {
      console.log(a);
    });
  }

}
