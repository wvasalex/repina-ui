import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SessionService } from '@shared/services/session';
import { Router } from '@angular/router';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreComponent implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group({
    phone: [''],
    token: [''],
    new_password1: [''],
    new_password2: [''],
  });

  public sms$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public submitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sub: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
    this.sub = this.formGroup.valueChanges.subscribe(() => {
      this.submitted$.next(false);
    });
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public $submit(e) {
    e.preventDefault();

    if (!this.sms$.value) {
      this.sessionService.confirmPhone(this.formGroup.value.phone).subscribe(() => {
        this.sms$.next(true);
      });
      return;
    }

    const req = this.sessionService.restorePassword(this.formGroup.value).toPromise().then(() => {
      this.router.navigate(['/ref/auth']);
    });

    this.toaster.wrapPromise(req, 'Пароль успешно восстановлен!', 'Не удалось восстановить пароль!');
  }

  public $getError(field: string): string {
    if (!this.submitted$.value) {
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
