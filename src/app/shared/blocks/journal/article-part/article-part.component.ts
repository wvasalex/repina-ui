import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-article-part',
  templateUrl: './article-part.component.html',
  styleUrls: ['./article-part.component.scss'],
})
export class ArticlePartComponent extends BaseBlock {
  @Input() availableElements: SelectOption[];
}
