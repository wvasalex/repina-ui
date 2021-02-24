import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { MainService } from './main.service';
import { BehaviorSubject } from 'rxjs';
import { ContentBlock, ContentElement } from '@shared/types';
import { MainRenderService } from './main-render.service';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ListReorderComponent } from '@shared/list-reorder/list-reorder.component';
import { Project } from '@shared/projects/projects.model';
import { MatDialog } from '@angular/material/dialog';
import { FooterService } from '@shared/footer/footer.service';

@Component({
  selector: 'r-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent extends BaseBlock implements OnInit {

  public render = this.mainRenderService.render;

  public blocks$: BehaviorSubject<ContentBlock[]> = new BehaviorSubject<ContentBlock[]>([]);

  constructor(
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private mainRenderService: MainRenderService,
    private mainService: MainService,
    private footerService: FooterService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.mainService.get().subscribe((blocks: ContentBlock[]) => {
      this.blocks$.next(blocks);
    });

    this.footerService.setBreadcrumbs(null);
  }

  public $save() {
    this.editor = false;
    this._save();
  }

  public $reorder() {
    const reorder = (projects) => {
      this.dialog.open(ListReorderComponent, {
        data: {
          items: projects.map((project: Project) => {
            return {
              image: project.preview_file,
              ...project,
            };
          }),
          onChange: (items) => {
            this._saveProjects(items);
          },
        },
      });
    };

    const resolver = this.mainService.getProjects(this.blocks$.value[1].content_elements);
    resolver.then(reorder);
  }

  private _save() {
    const promises = [];
    const blocks = this.blocks$.value;

    blocks.forEach((block: ContentBlock) => {
      block.is_enabled = true;
      delete block.content_file;
      block.content_elements.forEach((element: ContentElement, index: number) => {
        delete element.content_file;
        element.position = index;
        /*element.element_type = 'main-project';
        if (index === 4 || index === 8 || index === 12) {
          element.element_type = 'main-promo';
        }*/
      });
      promises.push(this.mainService.save(block).toPromise());
    });

    this.toasterService.wrapPromise(
      Promise.all(promises), 'Сохранено', 'Не удалось сохранить');
  }

  private _saveProjects(items: Project[]) {
    const elements = items.map((item: Project) => {
      return {
        id: item['_element'].id,
        position: item.position,
      };
    });

    this.mainService.saveOrder(elements);

    this.mainService.get().subscribe((blocks: ContentBlock[]) => {
      this.blocks$.next(blocks);
    });
  }

}
