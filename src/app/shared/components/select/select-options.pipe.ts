import { Pipe, PipeTransform } from '@angular/core';
import { StrMap } from '../../types';
import { SelectOption } from './select.model';

@Pipe({
  name: 'selectOptions',
})
export class SelectOptionsPipe implements PipeTransform {
  public transform(data: StrMap<any>[], formatter: Function): SelectOption[] {
    return data.map((item) => formatter(item));
  }
}
