import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { StrMap } from '@shared/types';
import { requestServices, serviceRelations } from '@shared/page/request/request.model';
import { getOption, SelectOption } from '../../components/select/select.model';
import { RestService } from '@shared/services/api/rest.service';
import { ApiConfig } from '@shared/services/api/api.model';
import { ApiService } from '@shared/services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService extends RestService {

  public services: SelectOption[] = requestServices;

  public relations$: BehaviorSubject<SelectOption[]> = new BehaviorSubject<SelectOption[]>(null);

  public config: ApiConfig = {
    path: '/content_amo/',
  };

  constructor(public api: ApiService) {
    super();
  }

  public reset(options?: SelectOption[]) {
    (options || this.relations$.value)?.forEach((option: SelectOption) => option.meta.checked = false);

    if (!options) {
      this.relations$.next(null);
    }
  }

  public updateRelations(activeService: SelectOption) {
    const relations = activeService ? serviceRelations[activeService.value] : null;
    this.reset(this.relations$.value);
    this.reset(relations);

    this.relations$.next(JSON.parse(JSON.stringify(relations)));
  }

  public toggleRelation(relation: SelectOption, checked: boolean) {
    const relations = this.relations$.value;

    if (checked && relation.meta.exclude) {
      relation.meta.exclude.forEach((relationId: string) => {
        const option = getOption(relations, relationId);
        option.meta.checked = false;
      });
    }

    if (relation.meta.deps) {
      relation.meta.deps.forEach((relationId: string) => {
        const option = getOption(relations, relationId);
        option.meta.disabled = !checked;
        if (option.meta.disabled) {
          option.meta.checked = false;
        }

        if (option.meta.deps) {
          this.toggleRelation(option, option.meta.checked && !option.meta.disabled);
        }
      });
    }
  }

  public getSelectedRelations(relations: SelectOption[]): SelectOption[] {
    return relations.filter((option: SelectOption) => option.meta.checked);
  }

  public valid(proposalType: SelectOption): boolean {
    const proposals = this.getSelectedRelations(this.relations$.value || []);

    return proposalType && proposals.length > 0;
  }

  public send(proposalType: SelectOption, value: StrMap<string>): Observable<boolean> {
    const proposal_keys = this.getSelectedRelations(this.relations$.value || [])
      .filter((option) => !option.meta.disabled)
      .map((option) => option.value);

    const { name, phone, email, comment } = value;

    if (!proposalType || !proposal_keys.length) {
      return of(false);
    }

    return this.post({
      proposal_type: proposalType.value,
      proposal_keys,
      name,
      phone,
      email,
      comment,
    }).pipe(mapTo(true));
  }

}
