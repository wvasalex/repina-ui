import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { PaginatedDataSource } from '@shared/data-table/data-table-source.model';
import { PaginatedEndpoint } from '@shared/data-table/data-table.model';
import { StrMap } from '@shared/types';

@Component({
  selector: 's-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent implements OnInit {
  @Input() endpoint: PaginatedEndpoint<any>;
  @Input() headers: StrMap<string> = {};
  @Input() columns: string[];
  @Input() columnStyles: StrMap<StrMap<string>> = {};
  @Input() render: StrMap<TemplateRef<any>>;
  @Input() @HostBinding('attr.size') size: string;

  public data;

  constructor() {
  }

  ngOnInit(): void {
    this.data = new PaginatedDataSource(
      this.endpoint,
      {property: 'id', order: 'desc'},
    );
  }

  public filter(filters: StrMap<string>) {
    this.data.queryBy(filters);
  }

  public reload = (data?: any) => {
    this.data.reload();
    return data;
  };
}
