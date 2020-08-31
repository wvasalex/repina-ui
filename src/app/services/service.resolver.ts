import { Injectable } from '@angular/core';
import { ResolverService } from '@shared/services/api/resolver.service';
import { Service } from './services.model';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceResolver extends ResolverService<Project> {
  constructor(public service: ServicesService) {
    super();
  }
}
