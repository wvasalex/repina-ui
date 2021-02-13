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
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email] ],
    comment: [''],
    news: [true],
  });

  public selected: SelectOption[] = [];
  public proposalError: boolean;
  public sent: boolean = false;

  private sub: Subscription;
  private submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
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
  }

  public ngOnDestroy(): void {
    this.requestService.reset();
    this.sub.unsubscribe();
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
    return this.requestService.getSelectedRelations(relations);
  }

  public $submit(e) {
    e.preventDefault();

    this.submitted.next(true);
    this.proposalError = !this.requestService.valid(this.selected[0]);
    if (this.proposalError || !this.formGroup.valid) {
      this._scrollView();
      return;
    }

    const req = this.requestService.send(this.selected[0], this.formGroup.value)
      .toPromise()
      .then((sent: boolean) => {
        this.sent = sent;
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
      this.ref.nativeElement.scrollIntoView();
    }
  }

}
