import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StrMap } from '@shared/types';

@Component({
  selector: 'r-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEditorComponent implements OnInit {
  public item: StrMap<string>;
  public props: StrMap<string>[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ListEditorComponent>,
  ) {
  }

  ngOnInit(): void {
    this.item = this.data.item || {
      props: {},
    };
    this.props = (this.data.props || []).slice();
  }

  public $delete() {
    if (confirm('Удалить элемент?')) {
      this.dialogRef.close(null);
    }
  }
}
