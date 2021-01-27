import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AgencyService } from '../agency.service';
import { ContentBlock, ContentElement } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { AgencyRenderService } from '../agency-render.service';

@Component({
  selector: 'r-agency-editor',
  templateUrl: './agency-editor.component.html',
  styleUrls: ['./agency-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyEditorComponent implements OnInit {

  public render = this.agencyRenderService.render;

  public blocks: ContentBlock[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private agencyService: AgencyService,
    private agencyRenderService: AgencyRenderService,
  ) {
  }

  ngOnInit(): void {
    this.agencyService.get().subscribe((blocks: ContentBlock[]) => {
      this.blocks = blocks;
      this.changeDetectorRef.detectChanges();
    });
  }

  public $save() {
    this._save();
  }

  public $background(header: ContentBlock): string {
    return header.content_elements[0].content_file;
  }

  public $menuColor(header: ContentBlock): 'white' | 'black' {
    return header?.props?.isDark ? 'black' : 'white';
  }

  private _save() {
    const promises = [];
    const blocks = JSON.parse(JSON.stringify(this.blocks));
    blocks.forEach((block: ContentBlock) => {
      block.content_elements.forEach((element: ContentElement) => {
        delete element.content_file;
      });

      if (block.block_type !== 'agency-gallery') {
        promises.push(this.agencyService.save(block).toPromise());
      }
    });

    this.toasterService
      .wrapPromise(Promise.all(promises), 'Сохранено', 'Не удалось сохранить');
  }

}
