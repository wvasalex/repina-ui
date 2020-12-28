import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  OnDestroy,
  OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { MainAnimationService } from '../main-animation.service';

@Component({
  selector: 'r-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent extends BaseBlock implements OnInit, OnDestroy {

  @ViewChild('sphere', { static: true, read: ViewContainerRef }) sphereRef: ViewContainerRef;

  constructor(
    private ref: ElementRef,
    private mainAnimationService: MainAnimationService,
  ) {
    super();
  }

  public ngOnInit() {
    if (!this.editor) {
      this.mainAnimationService.attach(this.ref.nativeElement, this.sphereRef);
    }
  }

  public ngOnDestroy() {
    this.mainAnimationService.detach();
  }

}
