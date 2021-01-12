import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { errorAnimation } from '@shared/animations';
import { BreakpointService } from '@shared/breakpoint.service';
import { ContentListItem } from '../../lists/lists.model';
import { AgencyService } from '../agency.service';

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
        const dateA = new Date(this._normalizeDate(a.props.date, true));
        const dateB = new Date(this._normalizeDate(b.props.date, true));

        if (dateA == dateB) {
          return 0;
        }

        return dateA > dateB ?
          -1 : 1;
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

  public $date(raw: string): string {
    return this._normalizeDate(raw);
  }

  private _normalizeDate(raw: string, normal: boolean = false): string {
    return raw.replace(/(\d+)\D+(\d+)\D+(\d+)/, normal ? '$2.$1.$3' : '$1 — $2 / $3');
  }

}
