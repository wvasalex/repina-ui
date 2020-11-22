import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { requestServices, serviceRelations } from '@shared/page/request/request.model';
import { getOption, SelectOption } from '../../components/select/select.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public services: SelectOption[] = requestServices;

  public relations$: BehaviorSubject<SelectOption[]> = new BehaviorSubject<SelectOption[]>(null);

  constructor() { }

  public updateRelations(activeService: SelectOption) {
    const relations = activeService ? serviceRelations[activeService.value] : null;

    this.relations$.next(relations);
  }

  public toggleRelation(relation: SelectOption, checked: boolean) {
    const relations = this.relations$.value;
    relation.meta.deps.forEach((relationId: string) => {
      const option = getOption(relations, relationId);
      option.meta.disabled = !checked;
    });
  }

}
