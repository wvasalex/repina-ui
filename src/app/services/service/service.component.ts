import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../services.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'r-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent implements OnInit {

  public render = this.servicesService.render;

  public service: Service;

  @HostBinding('attr.type') type: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService,
  ) {
  }

  ngOnInit(): void {
    this.service = this.activatedRoute.snapshot.data.service;
    this.type = this.service.service_type;
  }

}
