import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit {
  @Input() src: string;

  constructor() { }

  ngOnInit(): void {
  }

}
