import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'r-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesComponent implements OnInit {

  @HostBinding('class.visible') visible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.visible = window.localStorage.getItem('cookies') !== 'accepted';
    }
  }

  public $close() {
    window.localStorage.setItem('cookies', 'accepted');
    this.visible = false;
  }

}
