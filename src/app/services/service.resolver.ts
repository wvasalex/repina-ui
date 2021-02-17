import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResolverService } from '@shared/services/api/resolver.service';
import { Service } from './services.model';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceResolver extends ResolverService<Service> {
  constructor(
    public router: Router,
    public service: ServicesService) {
    super();
  }
}
