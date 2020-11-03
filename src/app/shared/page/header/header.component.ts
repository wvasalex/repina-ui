import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  @Input() backgroundImage: string; // @HostBinding('style.backgroundImage')
  @Input() @HostBinding('class.fullscreen') fullscreenBackgroundImage: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  public $isImage(src: string): boolean {
    return /\.(jpe?g|png|gif)$/.test(src);
  }

}
