import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { map } from 'rxjs/operators';
import { Service } from '../../../services/services.model';
import { ServicesService } from '../../../services/services.service';
import { SelectOption } from '@shared/components/select/select.model';
import { ListsService } from '../../../lists/lists.service';
import { ContentListItem } from '../../../lists/lists.model';

@Component({
  selector: 'r-project-roles',
  templateUrl: './project-roles.component.html',
  styleUrls: ['./project-roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRolesComponent extends BaseBlock {
  public services$ = this.listsService.resolve('team')
    .pipe(map((services: ContentListItem[]) => {
      return services.map((member: ContentListItem) => {
        return {
          value: member.props.role,
          label: member.props.name,
        };
      });
    }));

  constructor(private listsService: ListsService) {
    super();
  }

  public $rolesChanged(roles: SelectOption[]) {
    this.props.roles = JSON.stringify(roles);
  }

  public $parseRoles(rolesJson: string): SelectOption[] {
    return rolesJson ?
      JSON.parse(rolesJson) :
      [];
  }
}