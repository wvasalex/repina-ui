import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceRequestComponent extends BaseBlock {

  public $click(e) {
    if (this.editor) {
      e.preventDefault();
    }
  }

}
