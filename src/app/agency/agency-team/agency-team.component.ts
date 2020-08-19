import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TeamMember } from './agency-team.model';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-team',
  templateUrl: './agency-team.component.html',
  styleUrls: ['./agency-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyTeamComponent extends BaseBlock {
  public members: TeamMember[] = [
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 1,
    },
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 2,
    },
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 3,
    },
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 4,
    },
  ];

}
