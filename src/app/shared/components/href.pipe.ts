import { Pipe, PipeTransform } from '@angular/core';
import { SessionStateService } from '@shared/services/session';

@Pipe({
  name: 'href',
})
export class HrefPipe implements PipeTransform {

  constructor(private sessionStateService: SessionStateService) {
  }

  public transform(value: string, ...args: unknown[]): unknown {
    if (this.sessionStateService.token) {
      return value;
    }

    return value && value.split('/').pop().indexOf('_') !== 0 ?
      value :
      null;
  }

}
