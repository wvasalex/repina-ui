import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
