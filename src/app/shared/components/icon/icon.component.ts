import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input() name: string;
  @Input() @HostBinding('style.width.px') width: number = 24;
  @Input() @HostBinding('style.height.px') height: number = 24;

  constructor() { }

  ngOnInit(): void {
  }

}
