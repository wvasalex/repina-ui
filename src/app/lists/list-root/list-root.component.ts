import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-list-root',
  templateUrl: './list-root.component.html',
  styleUrls: ['./list-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListRootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
