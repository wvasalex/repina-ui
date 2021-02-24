import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {

  private _navigationSub: Subscription;

  constructor(private router: Router) {
    this._navigationSub = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          (window as any).initMango();
        }
      }
    });
  }

  public ngOnDestroy() {
    this._navigationSub.unsubscribe();
  }

}
