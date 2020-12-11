import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { StrMap } from '@shared/types';
import { parseQueryParams } from '@shared/functions';

@Component({
  selector: 'r-agency-repina',
  templateUrl: './agency-repina.component.html',
  styleUrls: ['./agency-repina.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyRepinaComponent extends BaseBlock {

  public $link(): string {
    const {buttonHref} = this.props;
    return buttonHref ? buttonHref.split('?')[0] : '/blog';
  }

  public $queryParams(): StrMap<string> {
    const {buttonHref} = this.props;
    return parseQueryParams(buttonHref && buttonHref.split('?')[1]);
  }

}
