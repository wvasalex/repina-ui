import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'r-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.create();
    this.router.navigate(['/']);
  }

}
