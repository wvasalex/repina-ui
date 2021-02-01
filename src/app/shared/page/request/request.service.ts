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
  providedIn: 'root'
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

  public updateRelations(activeService: SelectOption) {
    const relations = activeService ? serviceRelations[activeService.value] : null;
    if (relations) {
      relations.forEach((option: SelectOption) => option.meta.checked = false);
    }

    this.relations$.next(relations);
  }

  public toggleRelation(relation: SelectOption, checked: boolean) {
    const relations = this.relations$.value;
    relation.meta.deps.forEach((relationId: string) => {
      const option = getOption(relations, relationId);
      option.meta.disabled = !checked;
    });
  }

  public getSelectedRelations(relations: SelectOption[]): SelectOption[] {
    return relations.filter((option: SelectOption) => option.meta.checked);
  }

  public valid(proposalType: SelectOption): boolean {
    const proposals = this.getSelectedRelations(this.relations$.value || []);

    return proposalType && proposals.length > 0;
  }

  public send(proposalType: SelectOption, value: StrMap<string>): Observable<boolean> {
    const proposal_keys = this.getSelectedRelations(this.relations$.value || []).map((option) => option.value);
    const {name, phone, email, comment} = value;

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
