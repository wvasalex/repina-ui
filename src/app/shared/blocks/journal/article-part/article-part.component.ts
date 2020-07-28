import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.class';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-article-part',
  templateUrl: './article-part.component.html',
  styleUrls: ['./article-part.component.scss'],
})
export class ArticlePartComponent extends BaseBlock {
  public availableElements: SelectOption[] = [
    { value: 'article-text', label: 'Текст' },
    { value: 'article-image', label: 'Изображение' },
    { value: 'article-quote', label: 'Цитата' },
    { value: 'article-author', label: 'Автор' },
  ];
}
