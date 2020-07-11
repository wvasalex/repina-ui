import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerComponent implements OnInit {
  @Input() @HostBinding('attr.color') menuColor: 'white' | 'black' = 'white';

  constructor() {
  }

  ngOnInit(): void {
  }

}
