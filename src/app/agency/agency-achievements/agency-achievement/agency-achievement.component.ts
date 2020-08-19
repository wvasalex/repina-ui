import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-achievement',
  templateUrl: './agency-achievement.component.html',
  styleUrls: ['./agency-achievement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyAchievementComponent extends BaseBlock {

}
