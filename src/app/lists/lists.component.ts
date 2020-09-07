import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ListsService } from './lists.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContentListItem } from './lists.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    public listsService: ListsService) {
  }

}
