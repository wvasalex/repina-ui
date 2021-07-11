import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-ref-agency-achievement',
  templateUrl: './ref-agency-achievement.component.html',
  styleUrls: ['./ref-agency-achievement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefAgencyAchievementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
