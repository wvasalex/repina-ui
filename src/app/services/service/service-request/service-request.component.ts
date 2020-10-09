import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageComponent } from '@shared/page/page.component';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceRequestComponent extends BaseBlock {

  constructor(private page: PageComponent) {
    super();
  }

  public $priceRequest() {
    if (!this.editor) {
      this.page.priceRequest.emit();
    }
  }

}
