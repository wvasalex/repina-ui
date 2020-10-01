import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() title: string = 'Запрос коммерческого предложения';
  @Input() disablePadding: boolean = false;

  public services: SelectOption[] = [
    {
      value: 'company',
      label: 'Компании',
    },
    {
      value: 'product',
      label: 'Продукта',
    },
    {
      value: 'hr',
      label: 'HR-бренда',
    },
  ];

  constructor(public ref: ElementRef) { }

  ngOnInit(): void {
  }

}
