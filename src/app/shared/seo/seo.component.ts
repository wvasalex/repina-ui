import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '@shared/seo/seo.service';
import { Subscription } from 'rxjs';
import { SeoData } from '@shared/seo/seo.model';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeoComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup = this.formBuilder.group({
    title: [''],
    description: [''],
    keywords: [''],
    robots: ['index, follow'],
  });

  private _sub: Subscription;

  private _id: number = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private seoService: SeoService,
    ) {

  }

  public ngOnInit(): void {
    this._sub = this.activatedRoute.url.subscribe(() => {
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
    return this.router.url;
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

    this.title.setTitle(seo.props.title);
    for (let name in seo.props) {
      if (seo.props.hasOwnProperty(name)) {
        this.meta.updateTag({
          name,
          content: seo.props[name],
        });
      }
    }
  }

}
