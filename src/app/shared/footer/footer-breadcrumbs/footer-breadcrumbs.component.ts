import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FooterService } from '@shared/footer/footer.service';
import { BreadcrumbItem } from '@shared/footer/footer.model';

@Component({
  selector: 'r-footer-breadcrumbs',
  templateUrl: './footer-breadcrumbs.component.html',
  styleUrls: ['./footer-breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBreadcrumbsComponent implements OnInit {

  public breadcrumbs$: BehaviorSubject<BreadcrumbItem[]> = this.footerService.breadcrumbs$;

  constructor(
    private footerService: FooterService,
  ) { }

  ngOnInit(): void {
  }

}
