import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services/session';

@Component({
  selector: 'r-ref',
  templateUrl: './ref.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
    this.router.navigate(this.sessionService.isValid() ? ['/ref/u/info'] : ['/ref/auth']);
  }

}
