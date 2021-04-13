import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-logo',
  templateUrl: './logo.component.svg',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent implements OnInit {
  @Input() @HostBinding('attr.color') menuColor: 'white' | 'black' = 'white';
  @Input() @HostBinding('style.width.px') width = 228;
  @Input() @HostBinding('style.height.px') height = 68;

  public get color() {
    return this.menuColor === 'white' ? 'black' : 'white';
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
