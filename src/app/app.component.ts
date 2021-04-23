import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountersService } from '@shared/services/counters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  constructor(private countersService: CountersService) {
  }

  public ngOnInit(): void {
    this.countersService.init()
  }

}
