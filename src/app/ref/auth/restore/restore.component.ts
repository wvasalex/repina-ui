import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'r-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreComponent implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group({
    phone: [''],
    password: [''],
  });

  public submitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sub: Subscription;

  constructor(private formBuilder: FormBuilder) { }

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