import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-achievements',
  templateUrl: './agency-achievements.component.html',
  styleUrls: ['./agency-achievements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyAchievementsComponent extends BaseBlock {

}
