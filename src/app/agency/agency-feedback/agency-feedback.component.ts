import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { errorAnimation, slider } from '@shared/animations';
import { ContentListItem } from '../../lists/lists.model';
import { AgencyService } from '../agency.service';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-agency-feedback',
  templateUrl: './agency-feedback.component.html',
  styleUrls: ['./agency-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slider,
    errorAnimation,
  ],
})
export class AgencyFeedbackComponent extends BaseBlock {

  public feedback$: Observable<ContentListItem[]> = this.agencyService.getFeedback()
    .pipe(tap((awards: ContentListItem[]) => {
      this.pagesCount = Math.ceil(awards.length / this.pageSize);
      this.last = awards.length - 1;
    }));

  public pagesCount: number;

  public prevIndex: number = 0;
  public currentIndex: number = 0;
  public last: number;
  public expanded: boolean = false;

  private pageSize: number = 1;

  constructor(private agencyService: AgencyService) {
    super();
  }

  ngOnInit(): void {
  }

  public $prev() {
    if (this.currentIndex > 0) {
      this.prevIndex = this.currentIndex--;
      this.expanded = false;
    }
  }

  public $next() {
    if (this.currentIndex < this.last) {
      this.prevIndex = this.currentIndex++;
      this.expanded = false;
    }
  }

  public $toggle() {
    this.expanded = !this.expanded;
  }
}
