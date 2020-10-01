import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgencyService } from '../agency.service';
import { ContentListItem } from '../../lists/lists.model';
import { tap } from 'rxjs/operators';
import { slider } from '@shared/animations';

@Component({
  selector: 'r-agency-awards',
  templateUrl: './agency-awards.component.html',
  styleUrls: ['./agency-awards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slider,
  ]
})
export class AgencyAwardsComponent implements OnInit {

  public awards$: Observable<ContentListItem[]> = this.agencyService.getAwards()
    .pipe(tap((awards: ContentListItem[]) => {
      this.pagesCount = Math.ceil(awards.length / this.pageSize);
      this.last = this.pagesCount - 1;
    }));

  public pagesCount: number;

  public prevIndex: number = 0;
  public currentIndex: number = 0;
  public last: number;

  private pageSize: number = 7;

  constructor(private agencyService: AgencyService) {
  }

  ngOnInit(): void {
  }

  public $page(awards: ContentListItem[]) {
    const offset: number = this.currentIndex * this.pageSize;
    return awards.slice(offset, offset + this.pageSize);
  }

  public $prev() {
    if (this.currentIndex > 0) {
      this.prevIndex = this.currentIndex--;
    }
  }

  public $next() {
    if (this.currentIndex < this.last) {
      this.prevIndex = this.currentIndex++;
    }
  }

}
