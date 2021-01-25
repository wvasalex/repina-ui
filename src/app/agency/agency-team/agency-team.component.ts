import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { AgencyService } from '../agency.service';
import { ContentListItem } from '../../lists/lists.model';

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
      this.pages = new Array(this.pagesCount + 1);
    }));

  public pagesCount: number;
  public currentIndex: number = 0;
  public pages: number[] = [];

  private pageSize: number = 3;

  constructor(
    private ref: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private agencyService: AgencyService,
  ) {
    super();
  }

  public $prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  public $next() {
    if (this.currentIndex < this.pagesCount) {
      this.currentIndex++;
    }
  }

  public $setIndex(index: number) {
    this.currentIndex = index;
  }

  public $margin(index: number): number {
    return -100 * index;
  }

}
