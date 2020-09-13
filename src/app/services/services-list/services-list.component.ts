import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { StrMap } from '@shared/types';
import { map } from 'rxjs/operators';
import { ListsService } from '../../lists/lists.service';
import { SelectOption } from '@shared/components/select/select.model';
import { ServicesService } from '../services.service';
import { Service } from '../services.model';

@Component({
  selector: 'r-service-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent extends BaseBlock implements OnInit {
  public services$ = this.servicesService.get()
    .pipe(map((services: Service[]) => {
      return services.map((service: Service) => {
        return {
          value: service.slug,
          label: service.title,
          meta: service.service_type,
        };
      });
    }));

  constructor(
    private servicesService: ServicesService,
    private listsService: ListsService,
  ) {
    super();
  }

  public $listChanged(services: SelectOption[]) {
    this.props.services = JSON.stringify(services);
  }

  public $parseList(json: string): SelectOption[] {
    return json ?
      JSON.parse(json) :
      [];
  }

  public services: StrMap<string>[][] = [];

  public ngOnInit() {
    this._init();
  }

  private _init() {
    const services = this.$parseList(this.props.services);
    const result = [];
    let group = [];

    services.forEach((item) => {
      if (item.meta === 'complex') {
        if (group.length > 0) {
          result.push(group);
          group = [];
        }
      }
      group.push({
        text: item.label,
        href: item.value,
      });
    });
    if (group.length > 0) {
      result.push(group);
    }

    this.services = result;
  }

  /*[
  [
    {
      text: 'Услуги',
      href: '/services',
    },
  ],
  [
    {
      text: 'Исследования',
      href: '/services',
    },
    {
      text: 'Аудит бренда',
      href: '/services',
    },
    {
      text: 'Потребительские исследования',
      href: '/services',
    },
    {
      text: 'Качественные исследования',
      href: '/services',
    },
    {
      text: 'Количественные исследования',
      href: '/services',
    },
  ],
  [
    {
      text: 'Стратегия',
      href: '/services',
    },
    {
      text: 'Позиционирование',
      href: '/services',
    },
    {
      text: 'Платформа бренда',
      href: '/services',
    },
    {
      text: 'Коммуникационная стратегия',
      href: '/services',
    },
    {
      text: 'Разработка брендбука',
      href: '/services',
    },
  ],
  [
    {
      text: 'Нейминг и tone of voice',
      href: '/services',
    },
    {
      text: 'Разработка названия',
      href: '/services',
    },
    {
      text: 'Разработка слогана',
      href: '/services',
    },
    {
      text: 'Создание голоса бренда',
      href: '/services',
    },
  ],
];*/
}
