import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ContentBlock } from '@shared/types';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'r-agency-achievements',
  templateUrl: './agency-achievements.component.html',
  styleUrls: ['./agency-achievements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyAchievementsComponent extends BaseBlock implements OnInit {

  @Input() embed: boolean = false;

  private block$ = this.agencyService.getAchievements();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private agencyService: AgencyService,
  ) {
    super();
  }

  public ngOnInit(): void {
    if (this.embed) {
      this.block$.subscribe((block: ContentBlock) => {
        if (block) {
          this.elements = block.content_elements;
          this.changeDetectorRef.detectChanges();
        }
      });
    }
  }

}
