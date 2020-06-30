import { Component, OnInit } from '@angular/core';
import { TeamMember } from './team.model';

@Component({
  selector: 'r-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public members: TeamMember[] = [
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 1,
    },
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 2,
    },
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 3,
    },
    {
      name: 'Анвар Курбанов',
      role: 'Арт-директор',
      position: 4,
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
