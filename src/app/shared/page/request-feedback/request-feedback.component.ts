import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-request-feedback',
  templateUrl: './request-feedback.component.html',
  styleUrls: ['./request-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFeedbackComponent implements OnInit {

  constructor() {
  }

  public ngOnInit(): void {
  }

}
