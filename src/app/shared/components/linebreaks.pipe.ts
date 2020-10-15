import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaks'
})
export class LinebreaksPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\n/g, '<br>').replace(/&#8212;/g, '<br>');
  }

}