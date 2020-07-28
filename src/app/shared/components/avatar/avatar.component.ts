import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
