import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-contacts-address',
  templateUrl: './contacts-address.component.html',
  styleUrls: ['./contacts-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsAddressComponent extends BaseBlock {

}
