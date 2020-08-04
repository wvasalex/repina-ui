import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services/session';

@Component({
  selector: 'r-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.toggle();
    this.router.navigate(['/']);
  }

}
