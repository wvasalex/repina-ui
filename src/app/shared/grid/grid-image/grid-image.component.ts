import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridImageComponent implements OnInit {
  @Input() src: string;

  constructor() { }

  ngOnInit(): void {
  }

}
