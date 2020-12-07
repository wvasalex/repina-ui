import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent implements OnInit {

  @Input() @HostBinding('class.selected') selected: boolean = false;
  @Input() @HostBinding('class.disabled') disabled: boolean = false;
  @Input() @HostBinding('class.round') round: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
