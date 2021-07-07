import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToasterService } from '@shared/toaster/toaster.service';
import { SessionService } from '@shared/services/session';

@Component({
  selector: 'r-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    code: ['', [Validators.required]],
    password: ['', [Validators.required]],
    policy: [false, [Validators.requiredTrue]],
  });

  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
    this.sub = this.formGroup.valueChanges.subscribe(() => {
      this.submitted.next(false);
    });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public $submit(e) {
    e.preventDefault();

    const {policy, code, ...value} = this.formGroup.value;

    if (!policy) {
      this.toaster.error('Пожалуйста, подтвердите согласие на обработку персональных данных!');
      return;
    }

    value.verify_password = value.password;
    const req = this.sessionService.signUp(value).toPromise();

    this.toaster.wrapPromise(req, 'Регистрация прошла успешно!', 'Не удалось зарегистрироваться!');
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
