import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
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
          value: member.props.name,
          label: member.props.name,
          meta: {
            value: member.props.role,
          },
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