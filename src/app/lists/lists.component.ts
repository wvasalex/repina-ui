import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ListsService } from './lists.service';
import { MatDialog } from '@angular/material/dialog';
import { ContentListItem, PropsDef } from './lists.model';
import { ListEditorComponent } from './list-editor/list-editor.component';
import { ToasterService } from '@shared/toaster/toaster.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      data: {
        item,
        props: PropsDef[this.listsService.type.value],
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._save(result);
      }
    });
  }

  private _save(item: ContentListItem) {
    if (!item.list_type) {
      item.list_type = this.listsService.type.value;
    }

    const promise = this.listsService.save(item)
      .toPromise();
    this.toasterService.wrapPromise(promise, 'Сохранено!', 'Не удалось сохранить!');
  }
}
