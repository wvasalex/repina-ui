import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ListsService } from './lists.service';
import { ContentListItem, PropsDef } from './lists.model';
import { ListEditorComponent } from './list-editor/list-editor.component';


@Component({
  selector: 'r-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListsComponent {
  public columns$: Observable<string[]> = this.listsService.type.pipe(
    map((type: string) => {
      return PropsDef[this.listsService.type.value].map((prop) => {
        return prop.name;
      });
    }),
  );

  constructor(
    private dialog: MatDialog,
    private toasterService: ToasterService,
    public listsService: ListsService) {
  }

  public $edit(item?: ContentListItem) {
    const dialogRef = this.dialog.open(ListEditorComponent, {
      width: '450px',
      data: {
        item,
        props: PropsDef[this.listsService.type.value],
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null && item) {
        this._delete(item);
      }
      if (result) {
        this._save(result);
      }
    });
  }

  private _save(item: ContentListItem) {
    if (!item.list_type) {
      item.list_type = this.listsService.type.value;
    }

    const promise = this.listsService.save(item).toPromise();
    this.toasterService.wrapPromise(promise, 'Сохранено!', 'Не удалось сохранить!');
  }

  private _delete(item: ContentListItem) {
    const promise = this.listsService.delete(item.id).toPromise();
    this.toasterService.wrapPromise(promise, 'Удалено!', 'Не удалось удалить!');

  }
}
