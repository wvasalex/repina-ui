import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { ToasterService } from '@shared/toaster/toaster.service';
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

  public sent: boolean = false;

  private sub: Subscription;
  private submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private toasterService: ToasterService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) @Optional() public data: StrMap<any>,
  ) {
  }

  public ngOnInit(): void {
    this.sub = this.formGroup.valueChanges.subscribe(() => {
      this.submitted.next(false);
    });
  }

  public ngOnDestroy(): void {
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

    if (relation.meta.deps) {
      this.requestService.toggleRelation(relation, checked);
    }
  }

  public $selectedRelations(relations: SelectOption[]) {
    return this.requestService.getSelectedRelations(relations);
  }

  public $submit(e) {
    e.preventDefault();

    this.submitted.next(true);

    if (!this.formGroup.valid) {
      this.toasterService.error('Пожалуйста, заполните все обязательные поля!');
      return;
    }

    const req = this.requestService.send(this.selected[0], this.formGroup.value)
      .toPromise()
      .then((sent: boolean) => {
        this.sent = sent;
        this.changeDetectorRef.detectChanges();

        if (!sent) {
          this.toasterService.error('Пожалуйста, выберите интересующие вас услуги!');
        }
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

}
