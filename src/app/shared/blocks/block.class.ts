import { Input, Output } from '@angular/core';
import { StrMap } from '../types';

export class BaseBlock {
  @Input() props: StrMap<string> = {};
  @Input() editor: boolean = false;
  @Input() elements: any[];

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
    if (!this.props.hasOwnProperty(prop)) {
      return;
    }

    this.props[prop] = value;
  }

  public $addElement(type: string) {
    console.log('add element of type ' + type);
    this.elements.push({
      element_type: type,
      props: {
        src: '/assets/pictures/journal/article_image.png',
      },
    });
  }

  public getValue(): StrMap<string> {
    return this.props;
  }
}
