import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { slider } from '@shared/animations';

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
  public comments = [
    {
      name: 'Иван Отзывчивый',
      role: 'Директор по маркетингу «Седьмой Континент»',
      quote: 'Я оценил четкость работы команды, соблюдение всех сроков, отличный тайм-менеджмент и умение организовать рабочий процесс',
    },
    {
      name: 'Иван Отзывчивый 2',
      role: 'Директор по маркетингу «Восьмой Континент»',
      quote: 'Я оценил четкость работы команды, соблюдение всех сроков, отличный тайм-менеджмент и умение организовать рабочий процесс',
    },
  ];

  public prevIndex: number = 0;
  public currentIndex: number = 0;
  public last: number = this.comments.length - 1;

  constructor() { }

  ngOnInit(): void {
  }

  public $prev() {
    if (this.currentIndex > 0) {
      this.prevIndex = this.currentIndex--;
    }
  }

  public $next() {
    if (this.currentIndex < this.last) {
      this.prevIndex = this.currentIndex++;
    }
  }
}
