import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectOption } from '@shared/components/select/select.model';
import { StrMap } from '@shared/types';
import { DataTableFiltersService } from '@shared/data-table/data-table-filters/data-table-filters.service';
import { DataTableFilterParams } from '@shared/data-table/data-table-filters/data-table-filters.model';

@Component({
  selector: 's-data-table-filters',
  templateUrl: './data-table-filters.component.html',
  styleUrls: ['./data-table-filters.component.scss'],
  providers: [
    DataTableFiltersService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableFiltersComponent implements OnInit, OnDestroy {
  @Input() filters: SelectOption[];

  @Output() filter: EventEmitter<StrMap<string>> = new EventEmitter<StrMap<string>>();

  public formGroup: FormGroup;
  public activeFilters: SelectOption[] = [];
  public moreFilters: SelectOption[] = [];

  private paramsSub: Subscription;
  private defaultFilters: DataTableFilterParams = {};
  private filtersMap: StrMap<SelectOption> = {};

  constructor(
    private formBuilder: FormBuilder,
    private filtersService: DataTableFiltersService) {
  }

  ngOnInit(): void {
    this.filtersService.init();

    const controls: StrMap<FormControl> = this.filters.reduce((result, filter: SelectOption) => {
      this.filtersMap[filter.value] = filter;
      result[filter.value] = [''];
      return result;
    }, {});

    this.formGroup = this.formBuilder.group(controls);

    this.paramsSub = this.filtersService.changes.subscribe((filters) => {
      const newFilters = filters || this.defaultFilters;

      if (!filters) {
        this.formGroup.reset();
      }
      this.formGroup.patchValue(newFilters, { emitEvent: false });

      this.filter.emit(newFilters);
      this.syncFilters(Object.keys(newFilters));
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  public $submit(e: Event) {
    e.preventDefault();

    this.filtersService.setFilters(this.getFilledFilters());
  }

  public $addFilter(filterName: string) {
    if (!filterName) {
      return;
    }

    const filters = this.activeFilters.map((filter: SelectOption) => {
      return '' + filter.value;
    });
    filters.push(filterName);

    this.syncFilters(filters);
  }

  private getFilledFilters() {
    const value = this.formGroup.value;
    return this.activeFilters.reduce((filled, filter: SelectOption) => {
      filled[filter.value] = value[filter.value];
      return filled;
    }, {});
  }

  private syncFilters(currentFilters: string[]) {
    let i = 0;
    while (currentFilters.length < 3 && i < this.filters.length) {
      const value: string = this.filters[i++].value as string;
      if (currentFilters.indexOf(value) === -1) {
        currentFilters.push(value);
      }
    }

    const moreFilters: SelectOption[] = [];
    const activeFilters: SelectOption[] = [];
    for (const key in this.filtersMap) {
      if (this.filtersMap.hasOwnProperty(key)) {
        const collection: SelectOption[] = currentFilters.indexOf(key) === -1 ? moreFilters : activeFilters;
        const option: SelectOption = this.filtersMap[key];

        if (collection.indexOf(option) === -1) {
          collection.push(option);
        }
      }
    }

    this.activeFilters = activeFilters;
    this.moreFilters = moreFilters;
  }

}
