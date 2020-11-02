import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as lottie from 'assets/lottie.min.js';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-animation',
  templateUrl: './service-animation.component.html',
  styleUrls: ['./service-animation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceAnimationComponent extends BaseBlock implements OnInit {

  @ViewChild('animation', {static: true}) animationContainer: ElementRef;

  ngOnInit(): void {
    const a = this.props.animation;
    const animationData = a && JSON.parse(a);

    if (!animationData) {
      return;
    }

    lottie.loadAnimation({
      container: this.animationContainer.nativeElement,
      animationData: JSON.parse(animationData),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      rendererSettings: {},
    });
  }

}
