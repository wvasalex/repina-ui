import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ServicesListService } from '../services-list.service';
import { BaseBlock } from '@shared/blocks/block.component';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-service-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent extends BaseBlock implements OnInit {

  @Input() groupBy: 'tag_group' | 'parent' = 'tag_group';

  public services$;

  constructor(
    private toasterService: ToasterService,
    private servicesListService: ServicesListService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.services$ = this.servicesListService.groupBy(this.groupBy);
  }

  public $sort(block) {
    const req = this.servicesListService.sort(block, this.groupBy);
    this.toasterService.wrapPromise(req, 'Сохранено!', 'Не удалось сохранить!');
  }

}
