import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOption } from '@shared/components/select/select.model';
import { RequestService } from '@shared/page/request/request.service';
import { errorAnimation, opacityAnimation } from '@shared/animations';
import { ToasterService } from '@shared/toaster/toaster.service';
import { StrMap } from '@shared/types';

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
export class RequestComponent implements OnInit {

  @Input() title: string = 'Запрос коммерческого<br>предложения';
  @Input() disablePadding: boolean = false;

  public formGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    comment: [''],
    news: [true],
  });

  public selected: SelectOption[] = [];

  public sent: boolean = false;

  constructor(
    private toasterService: ToasterService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    @Inject(MAT_DIALOG_DATA) @Optional() public data: StrMap<any>,
  ) {
  }

  public ngOnInit(): void {
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

    if (!this.formGroup.valid) {
      this.toasterService.error('Пожалуйста, заполните все обязательные поля!');
      return;
    }

    const req = this.requestService.send(this.selected[0], this.formGroup.value)
      .toPromise()
      .then((sent: boolean) => {
        if (sent) {
          this.sent = true;
          this.changeDetectorRef.detectChanges();
        }
      });
    this.toasterService.wrapPromise(req, 'Обращение отправлено!', 'Не удалось отправить обращение, попробуйте позже!');
  }

}
