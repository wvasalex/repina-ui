import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';
import { Service } from '../services.model';

@Component({
  selector: 'r-services-primary',
  templateUrl: './services-primary.component.html',
  styleUrls: ['./services-primary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPrimaryComponent implements OnInit {

  public services$: Observable<Service[]> = this.servicesService.get({
    service_type: 'complex',
  });

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit(): void {
  }

}
