import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEditorComponent {

  public get item(): StrMap<any> {
    if (this.data.item && !this.data.item.props) {
      return {
        ...this.data.item,
        props: this.data.item,
      };
    }

    if (!this.data.item) {
      this.data.item = {props: {}};
    }

    return this.data.item;
  }

  public get props(): StrMap<string>[] {
    return (this.data.props || []).slice();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ListEditorComponent>,
  ) {
  }

  public $submit() {
    this.dialogRef.close(this.item);
  }

  public $delete() {
    if (confirm('Удалить элемент?')) {
      this.dialogRef.close(null);
    }
  }

}
