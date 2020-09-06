import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListsService } from './lists.service';

@Component({
  selector: 'r-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListsComponent implements OnInit {

  constructor(private listsService: ListsService) {
  }

  ngOnInit(): void {
    this.listsService.get().subscribe((data) => {
      console.log(data);
    });
  }

}
