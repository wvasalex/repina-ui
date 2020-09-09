import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { AgencyService } from '../agency.service';
import { Observable } from 'rxjs';
import { ContentListItem } from '../../lists/lists.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'r-agency-team',
  templateUrl: './agency-team.component.html',
  styleUrls: ['./agency-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyTeamComponent extends BaseBlock {
  public members$: Observable<ContentListItem[]> = this.agencyService.getTeam()
    .pipe(tap((members: ContentListItem[]) => {
      this.pagesCount = Math.floor(members.length / this.pageSize);
    }));

  public pagesCount: number;
  public prevIndex: number = 0;
  public currentIndex: number = 0;

  private pageSize: number = 3;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private agencyService: AgencyService,
  ) {
    super();
  }

  public $prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.changeDetectorRef.detectChanges();
    }
  }

  public $next() {
    if (this.currentIndex < this.pagesCount) {
      this.currentIndex++;
      this.changeDetectorRef.detectChanges();
    }
  }
}
