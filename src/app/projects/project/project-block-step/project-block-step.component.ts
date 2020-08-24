import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-block-step',
  templateUrl: './project-block-step.component.html',
  styleUrls: ['./project-block-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectBlockStepComponent extends BaseBlock implements OnInit {
  @HostBinding('attr.color') private color: string = 'none';

  ngOnInit(): void {
    const color: string = this.props.color;

    if (color) {
      this.color = color;
    }
  }
}
