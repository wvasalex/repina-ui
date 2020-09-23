import { ChangeDetectionStrategy, Component, ContentChild, OnInit } from '@angular/core';

@Component({
  selector: 'r-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeComponent implements OnInit {

  @ContentChild('marqueeContent', { static: false }) content;

  constructor() { }

  ngOnInit(): void {

  }

}
