import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ListsService } from './lists.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentListTypes } from './lists.model';

@Component({
  selector: 'r-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListsComponent implements OnInit, OnDestroy {
  public type: string;

  private _sub$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listsService: ListsService) {
  }

  ngOnInit(): void {
    this.init();
    this._sub$ = this.activatedRoute.params.subscribe(() => this.init());

    this.listsService.get().subscribe((data) => {
      console.log(data);
    });
  }

  public ngOnDestroy() {
    this._sub$.unsubscribe();
  }

  private init() {
    this.type = this.activatedRoute.snapshot.params.type;
  }

}
