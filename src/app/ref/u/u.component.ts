import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { drawerAnimation } from '@shared/animations';

@Component({
  selector: 'r-u',
  templateUrl: './u.component.html',
  styleUrls: ['./u.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    drawerAnimation,
  ],
})
export class UComponent implements OnInit {

  public drawerOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public $toggleDrawer(opened: boolean) {
    this.drawerOpened = opened;
  }

}
