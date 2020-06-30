import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent implements OnInit {
  @Input() @HostBinding('attr.color') menuColor: 'white' | 'black' = 'white';
  @Input() @HostBinding('style.width.px') width = 228;
  @Input() @HostBinding('style.height.px') height = 68;

  constructor() { }

  ngOnInit(): void {
  }

}
