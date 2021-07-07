import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SessionService } from '@shared/services/session';
import { ToasterService } from '@shared/toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'r-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup = this.formBuilder.group({
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sub: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private toaster: ToasterService,
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

    const req = this.sessionService.signIn(this.formGroup.value).toPromise().then(() => {
      this.router.navigate(['/ref/u/info']);
    });

    this.toaster.wrapPromise(req, 'Вы вошли в систему!', 'Не удалось войти!');
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
