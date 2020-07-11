import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { slider } from '../../shared/animations';

@Component({
  selector: 'r-agency-feedback',
  templateUrl: './agency-feedback.component.html',
  styleUrls: ['./agency-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slider,
  ]
})
export class AgencyFeedbackComponent implements OnInit {
  public feedbacks = [
    {
      name: 'Иван Отзывчивый',
      role: 'Директор по маркетингу «Седьмой Континент»',
      quote: 'Я оценил четкость работы команды, соблюдение всех сроков, отличный тайм-менеджмент и умение организовать рабочий процесс',
    },
    {
      name: 'Иван Отзывчивый 2',
      role: 'Директор по маркетингу «Седьмой Континент»',
      quote: 'Я оценил четкость работы команды, соблюдение всех сроков, отличный тайм-менеджмент и умение организовать рабочий процесс',
    },
  ];

  public index = 0;
  public last = this.feedbacks.length - 1;

  constructor() { }

  ngOnInit(): void {

  }

  public $prev() {
    this.index = 0;
  }

  public $next() {
    this.index = 1;
  }
}
