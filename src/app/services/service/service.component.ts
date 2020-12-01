import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Service } from '../services.model';
import { ServicesRenderService } from '../services-render.service';

@Component({
  selector: 'r-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceComponent implements OnInit {

  public render = this.servicesRenderService.render;

  public service$: Observable<Service> = this.activatedRoute.data
    .pipe(
      pluck('service'),
      map((service: Service) => {
        service.content_blocks.splice(1, 0, {
          block_type: 'service-projects',
          props: {},
          content_elements: [
          ],
        });

        return service;
      }),
      tap((service) => {
        setTimeout(() => {
          this.type = service.service_type;
        });
      }),
    );

  @HostBinding('attr.type') type: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicesRenderService: ServicesRenderService,
  ) {
  }

  ngOnInit(): void {
  }

}
