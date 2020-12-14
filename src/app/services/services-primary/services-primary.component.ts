import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ServicesService } from '../services.service';
import { Service } from '../services.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'r-services-primary',
  templateUrl: './services-primary.component.html',
  styleUrls: ['./services-primary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPrimaryComponent implements OnInit {

  public animation$: Subject<string> = new Subject<string>();

  public services$: Observable<Service[]> = this.servicesService.get({
    service_type: 'complex',
  }).pipe(tap((services: Service[]) => {
    this.$setAnimation(services[0].preview_file);
  }));

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit(): void {
  }

  public $setAnimation(animation: string) {
    this.animation$.next(null);
    requestAnimationFrame(() => this.animation$.next(animation));
  }

  public $breakLine(text: string): string {
    return text.split(' ').join('<br>');
  }

}
