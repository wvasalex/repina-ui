import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-image-placeholder',
  templateUrl: './image-placeholder.component.html',
  styleUrls: ['./image-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePlaceholderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
