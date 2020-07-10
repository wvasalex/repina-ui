import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-agency-primary',
  templateUrl: './agency-primary.component.html',
  styleUrls: ['./agency-primary.component.scss'],
})
export class AgencyPrimaryComponent implements OnInit {
  public images = [
    '/assets/icons/agency/word1.svg',
    '/assets/icons/agency/word2.svg',
    '/assets/icons/agency/word3.svg',
  ];

  public blocks: string[][] = [
    ['3 слова о нас'],
    [
      'Энергия',
      'Энергия — это то, что двигает ваш бизнес вперед. Та же энергия переполняет нас. Мы приумножим вашу энергию и поможем найти фокус.',
    ],
    [
      'Страсть',
      'Бизнес — это страсть предпринимателя, которую он транслирует миру. Наш бизнес — это брендинг. Мы выступаем проводниками вашей страсти через свою, мы создаем воплощение вашего бизнеса в смысловых и визуальных формах.',
    ],
    [
      'Новаторство',
      'Наш бизнес — это смочь сказать что-то новое там, где все уже сказано. Это вызов, который мы принимаем в каждом новом проекте. Мы стремимся быть авторами эффективных и вдохновляющих решений, которыми вы сможете гордиться.',
    ],
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
