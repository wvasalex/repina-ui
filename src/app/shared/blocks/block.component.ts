import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ContentElement, StrMap } from '../types';

@Component({
  selector:'base-block',
  template: '',
})
export class BaseBlock {
  @Input() id: number;
  @Input() props: StrMap<string> = {};
  @Input() contentFile: string;
  @Input() @HostBinding('attr.editor') editor: boolean = false;
  @Input() elements: any[];
  @Input() render;
  @Input() index: number = 0;

  @Output() change: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeBlock: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeElement: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  public $getValue(prop: string) {
    if (this.props[prop]) {
      return this.$normalizeSpaces(this.props[prop].replace(/\n/g, '<br>'));
    }

    return this.editor ? ' ' : '';
  }

  public $contentChanged(value: string, prop: string) {
    this.props[prop] = value.trim();

    this.change.emit();
  }

  public $normalizeSpaces(value: string): string {
    return value && value.replace(/\s([а-яА-Я\w]{1,2})\s/gi, ' $1&nbsp;');
  }

  public $addElement(type: string) {
    this.elements.push({
      element_type: type,
      props: {
        value: '',
      },
    });

    this.change.emit();
  }

  public $visibleElements(elements: ContentElement[]) {
    return elements.filter((element: ContentElement) => {
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
