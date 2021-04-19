import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'r-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit {

  @Input() visible: boolean = false;
  @Input() src: string;
  @Input() alt: string;
  @Input() title: string;
  @Input() itemprop: string;

  @ViewChild('img', {static: true}) image: ElementRef;

  constructor() {
  }

  public ngOnInit(): void {
    if (this.visible) {
      this.$visible(this.image.nativeElement);
    }
  }

  public $visible(element) {
    element.setAttribute('src', this.src);
  }

}
