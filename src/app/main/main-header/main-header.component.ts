import {
  ChangeDetectionStrategy,
  Component, ElementRef, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges, ViewChild, ViewContainerRef,
} from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { MainAnimationService } from '../main-animation.service';
import { SessionStateService } from '@shared/services/session';

@Component({
  selector: 'r-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent extends BaseBlock implements OnInit, OnDestroy {

  @ViewChild('sphere', { static: true, read: ViewContainerRef }) sphereRef: ViewContainerRef;

  constructor(
    private sessionStateService: SessionStateService,
    private mainAnimationService: MainAnimationService,
    private ref: ElementRef,
  ) {
    super();
  }

  public ngOnInit() {
    if (!this.sessionStateService.token) {
      this.mainAnimationService.attach(this.ref.nativeElement, this.sphereRef);
    }
  }

  public ngOnDestroy() {
    this.mainAnimationService.detach();
  }

}
