import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'str2date',
})
export class Str2datePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value);
  }

}
