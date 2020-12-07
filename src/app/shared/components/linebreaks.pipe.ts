import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaks',
})
export class LinebreaksPipe implements PipeTransform {

  public transform(value: string, ...args: unknown[]): unknown {
    return (value || '')
      .replace(/\n/g, '<br>')
      .replace(/&#8212;/g, '<br>')
      .replace(/\s([а-яА-Яa-zA-Z]{1,2})\s/gi, ' $1&nbsp;')
      .replace(/\\/g, '<br>');
  }

}
