import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as lottie from 'assets/lottie.min.js';
import { AnimationData1 } from './animations';

@Component({
  selector: 'r-service-animation',
  templateUrl: './service-animation.component.html',
  styleUrls: ['./service-animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceAnimationComponent implements OnInit {

  @ViewChild('animation', {static: true}) animationContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
    lottie.loadAnimation({
      container: this.animationContainer.nativeElement,
      animationData: AnimationData1,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      rendererSettings: {
      },
    });
  }

}
