import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
