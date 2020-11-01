import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '@shared/seo/seo.service';
import { Subscription } from 'rxjs';
import { SeoData } from '@shared/seo/seo.model';

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private formBuilder: FormBuilder,
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

    this.seoService.save({
      model_name: this._url(),
      props: this.formGroup.value,
    }).subscribe();
  }

  private _url(): string {
    return this.router.url;
  }

  private _init() {
    this.seoService.getByUrl(this._url()).subscribe((seoData: SeoData) => {
      if (seoData) {
        this._set(seoData);
      }
    });
  }

  private _set(seo: SeoData) {
    this.formGroup.patchValue(seo.props);

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
