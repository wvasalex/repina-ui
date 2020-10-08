import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentListItem } from '../../lists/lists.model';
import { AgencyService } from '../agency.service';
import { map } from 'rxjs/operators';
import { errorAnimation } from '@shared/animations';
import { BreakpointState } from '@angular/cdk/layout';
import { BreakpointService } from '@shared/breakpoint.service';

@Component({
  selector: 'r-agency-media',
  templateUrl: './agency-media.component.html',
  styleUrls: ['./agency-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    errorAnimation,
  ],
})
export class AgencyMediaComponent implements OnInit {

  public media$: Observable<ContentListItem[]> = this.agencyService.getMedia()
    .pipe(map((list: ContentListItem[]) => {
      return list.sort((a, b) => {
        if (a.props.date == b.props.date) {
          return 0;
        }

        return a.props.date > b.props.date ?
          1 : -1;
      });
    }));

  public limit: number = 8;

  private pageSize: number = 8;

  constructor(
    private breakpointService: BreakpointService,
    private agencyService: AgencyService) {
  }

  ngOnInit(): void {
  }

  public $page(list: ContentListItem[]): ContentListItem[] {
    return list.slice(0, this.limit);
  }

  public $more() {
    this.limit += this.pageSize;
  }

}
