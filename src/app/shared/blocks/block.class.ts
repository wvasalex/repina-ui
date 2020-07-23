import { Input } from '@angular/core';
import { StrMap } from '../types';

export class BaseBlock {
  @Input() props: StrMap<string> = {};
  @Input() editor: boolean = false;
  @Input() elements: any[];

  public getValue(): StrMap<string> {
    return this.props;
  }
}
