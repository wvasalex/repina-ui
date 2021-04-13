import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'r-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {

  @Input() src: string;
  @Input() alt: string;
  @Input() title: string;
  @Input() itemprop: string;

  constructor() { }

  public $visible(element: HTMLElement) {
    element.setAttribute('src', this.src);
  }

}
