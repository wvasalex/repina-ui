import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOption } from '@shared/components/select/select.model';
import { RequestService } from '@shared/page/request/request.service';
import { errorAnimation, opacityAnimation } from '@shared/animations';
import { StrMap } from '@shared/types';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'r-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    errorAnimation,
    opacityAnimation,
  ],
})
export class RequestComponent implements OnInit, OnDestroy {

  @Input() title: string = 'Запрос коммерческого<br>предложения';
  @Input() disablePadding: boolean = false;

  public formGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email: ['', [Validators.required, Validators.email]],
    comment: [''],
    news: [true],
  });

  public selected: SelectOption[] = [];
  public proposalError: boolean;
  public sent: boolean = false;

  private sub: Subscription;
  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private cookieService: CookieService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    private ref: ElementRef,
    @Inject(MAT_DIALOG_DATA) @Optional() public data: StrMap<any>,
  ) {
  }

  public ngOnInit(): void {
    this.sub = this.formGroup.valueChanges.subscribe(() => {
      this.submitted.next(false);
    });

    if (this.data?.popup && typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      this.ref.nativeElement.classList.add('popup');
    }
  }

  public ngOnDestroy(): void {
    this.requestService.reset();
    this.sub.unsubscribe();

    if (typeof window !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  public $change(e) {
    const {item, checked} = e;

    this.selected = checked ? [item] : [];
    this.requestService.updateRelations(this.selected[0]);
  }

  public $relationChanged(e) {
    const relation = e.item;
    const checked = relation.meta.checked = e.checked;

    this.proposalError = false;

    if (relation.meta.deps || relation.meta.exclude) {
      this.requestService.toggleRelation(relation, checked);
    }
  }

  public $selectedRelations(relations: SelectOption[]) {
    this.submitted.next(false);
    return this.requestService.getSelectedRelations(relations);
  }

  public $submit(e) {
    e.preventDefault();

    if (this.submitted.value) {
      return;
    }

    this.submitted.next(true);
    this.proposalError = !this.requestService.valid(this.selected[0]);
    if (this.proposalError || this.formGroup.invalid) {
      this._scrollView();
      return;
    }

    const value = this.formGroup.value;
    value.roistat_visit = this.cookieService.get('roistat_visit');

    const req = this.requestService.send(this.selected[0], value)
      .toPromise()
      .then((sent: boolean) => {
        this._scrollView();
        this.sent = sent;
        this.submitted.next(false);
        this.changeDetectorRef.detectChanges();
      });
  }

  public $getError(field: string): string {
    if (!this.submitted.value) {
      return null;
    }

    const control = this.formGroup.get(field);

    if (field === 'phone') {
      if (/\D/.test(control.value)) {
        return 'Неверный телефон';
      }
    }

    if (control.valid) {
      return null;
    }

    const errors = control.errors || {};

    if (errors.required) {
      return 'Это поле обязательно';
    }

    if (errors.email) {
      return 'Неверный email';
    }

    return null;
  }

  private _scrollView() {
    const popupContainer = this.data?.popup ? this.ref.nativeElement.closest('.mat-dialog-container') : null;

    if (popupContainer) {
      popupContainer?.scrollTo(0, 0);
    } else {
      const el = this.ref.nativeElement;
      const top = el.offsetTop + el.clientHeight / 5 - 150;

      window.scrollTo(0, top);
    }
  }

}
