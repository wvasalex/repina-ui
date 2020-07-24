import { Input } from '@angular/core';
import { StrMap } from '../types';

export class BaseBlock {
  @Input() props: StrMap<string> = {};
  @Input() editor: boolean = false;
  @Input() elements: any[];

  public $contentChanged(value: string, prop: string) {
    if (!this.props.hasOwnProperty(prop)) {
      return;
    }

    this.props[prop] = value;
    console.log(this.props);
  }

  public getValue(): StrMap<string> {
    return this.props;
  }
}
