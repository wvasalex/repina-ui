import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
