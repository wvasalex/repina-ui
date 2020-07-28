import { Component, OnInit } from '@angular/core';
import { SessionService } from '@shared/services/session';

@Component({
  selector: 'r-a-button',
  templateUrl: './a-button.component.html',
  styleUrls: ['./a-button.component.scss']
})
export class AButtonComponent {


  constructor(private sessionService: SessionService) { }
}
