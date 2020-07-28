import { EventEmitter, Input, Output } from '@angular/core';
import { StrMap } from '../types';
import { ArticleContentBlock, ArticleContentElement } from '../../journal/journal.model';

export class BaseBlock {
  @Input() props: StrMap<string> = {};
  @Input() editor: boolean = false;
  @Input() elements: any[];

  @Output() removeBlock: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeElement: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  public $getValue(prop: string) {
    if (this.props[prop]) {
      return this.props[prop];
    }

    return this.editor ?
      '<' + prop + '>' :
      '';
  }

  public $contentChanged(value: string, prop: string) {
    this.props[prop] = value;
  }

  public $addElement(type: string) {
    this.elements.push({
      element_type: type,
      props: {
        src: '/assets/pictures/journal/article_image.png',
        value: '',
      },
    });
  }

  public $visibleElements(elements: ArticleContentElement[]) {
    return elements.filter((element: ArticleContentElement) => {
      return !element._destroy;
    });
  }

  public $removeBlock(id: number) {
    this.removeBlock.emit(id);
  }

  public $removeElement(id: number) {
    this.removeElement.emit(id);
  }

  public getValue(): StrMap<string> {
    return this.props;
  }
}
