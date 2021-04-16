import { combineLatest, Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@shared/seo/seo.service';
import { SeoData } from '@shared/seo/seo.model';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeoComponent implements OnInit, OnDestroy {

  @Input() readonly: boolean = true;

  private _controls = {
    title: [''],
    title_pagination: [''],
    description: [''],
    keywords: [''],
    robots: ['index, follow'],
    canonical: [''],
    'og:type': ['article'],
    'og:title': [''],
    'og:description': [''],
    'og:url': [''],
    'og:image': [''],
    'og:locale': [''],
  };

  public formGroup: FormGroup = this.formBuilder.group(this._controls);
  public controls: string[] = Object.keys(this._controls);

  private _sub: Subscription;

  private _id: number = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private seoService: SeoService,
  ) {

  }

  public ngOnInit(): void {
    this._sub = combineLatest([
      this.activatedRoute.url,
      this.activatedRoute.queryParams,
    ]).subscribe(() => {
      this._init();
    });
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public $submit(e: Event) {
    e.preventDefault();

    const data: SeoData = {
      model_name: this._url(),
      props: this.formGroup.value,
    };

    if (this._id) {
      data.id = this._id;
    }

    const req = this.seoService.save(data).toPromise().then(() => {
      this._set(data);
    });
    this.toasterService.wrapPromise(req, 'SEO сохранено!', 'Не удалось сохранить SEO!');
  }

  private _url(): string {
    const url = this.router.url.replace('/edit', '')
      .replace(/page=(\d+)/, '')
      .replace(/\?$/, '');

    return url;
  }

  private _init() {
    this.seoService.getByUrl(this._url()).subscribe((seoData: SeoData) => {
      if (seoData) {
        this._id = seoData.id;
        this._set(seoData);
      } else {
        this._id = null;
        this.formGroup.reset();

        this._set({
          model_name: this._url(),
          props: this.formGroup.value,
        });
      }
    });
  }

  private _set(seo: SeoData) {
    this.formGroup.patchValue(seo.props);

    const {title, title_pagination, canonical, ...meta} = seo.props;

    for (let name in meta) {
      if (meta.hasOwnProperty(name)) {
        this.seoService.updateTag(
          name,
          meta[name],
        );
      }
    }

    const {page} = this.activatedRoute.snapshot.queryParams;
    this.seoService.setPaginated(page, page > 1 && title_pagination || title, canonical);
  }

}
