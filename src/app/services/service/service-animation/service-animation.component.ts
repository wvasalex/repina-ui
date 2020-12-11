import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    const a = this.props.animation;
    let animationData;
    try {
      animationData = a && JSON.parse(a);
    } catch (e) {
    }

    if (!animationData) {
      return;
    }

    setTimeout(() => {
      const container = this.animationContainer.nativeElement;
      lottie.loadAnimation({
        container,
        animationData: JSON.parse(animationData),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        rendererSettings: {},
        viewBoxOnly: false,
      });

      this.renderer.removeAttribute(container.firstChild, 'height');
      this.renderer.removeStyle(container.firstChild, 'width');
    }, 300);
  }

}
