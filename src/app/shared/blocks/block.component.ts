import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { StrMap } from '../types';
import { ArticleContentBlock, ArticleContentElement } from '../../journal/journal.model';

@Component({
  selector:'base-block',
  template: '',
})
export class BaseBlock {
  @Input() props: StrMap<string> = {};
  @Input() @HostBinding('attr.editor') editor: boolean = false;
  @Input() elements: any[];

  @Output() change: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeBlock: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeElement: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  public $getValue(prop: string) {
    if (this.props[prop]) {
      return this.props[prop].replace(/\n/g, '<br>');
    }

    return this.editor ? ' ' : '';
  }

  public $contentChanged(value: string, prop: string) {
    this.props[prop] = value.trim();

    this.change.emit();
  }

  public $addElement(type: string) {
    this.elements.push({
      element_type: type,
      props: {
        src: '/assets/pictures/journal/article_image.png',
        value: '',
      },
    });

    this.change.emit();
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
