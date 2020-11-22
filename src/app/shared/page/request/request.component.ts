import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { SelectOption } from '@shared/components/select/select.model';
import { RequestService } from '@shared/page/request/request.service';
import { errorAnimation } from '@shared/animations';

@Component({
  selector: 'r-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    errorAnimation,
  ]
})
export class RequestComponent implements OnInit {

  @Input() title: string = 'Запрос коммерческого<br>предложения';
  @Input() disablePadding: boolean = false;

  public selected: SelectOption[] = [];

  constructor(
    public ref: ElementRef,
    public requestService: RequestService,
  ) {
  }

  ngOnInit(): void {
  }

  public $change(selected: SelectOption[]) {
    this.selected = selected.slice(-1);
    this.requestService.updateRelations(this.selected[0]);
  }

  public $relationChanged(e) {
    const relation = e.item;
    const checked = relation.meta.checked = e.checked;

    if (relation.meta.deps) {
      this.requestService.toggleRelation(relation, checked);
    }
  }

}
