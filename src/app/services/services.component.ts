import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
