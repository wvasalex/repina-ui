import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-project-text',
  templateUrl: './project-text.component.html',
  styleUrls: ['./project-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTextComponent extends BaseBlock implements OnInit {
  @Input() padding: boolean = true;

  @HostBinding('class.p-l') get _pl() {
    return this.index === 0;
  };
  @HostBinding('class.center') get _index() {
    return this.index !== 0;
  };
  @HostBinding('class.p-r') pr = true;
  @HostBinding('class.has-index') hasIndex;

  public ngOnInit() {
    this.hasIndex = this.index === 0;
  }
}
