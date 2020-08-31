import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-agency-primary',
  templateUrl: './agency-primary.component.html',
  styleUrls: ['./agency-primary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyPrimaryComponent extends BaseBlock {
  public images = [
    '/assets/icons/agency/word1.svg',
    '/assets/icons/agency/word2.svg',
    '/assets/icons/agency/word3.svg',
  ];
}
