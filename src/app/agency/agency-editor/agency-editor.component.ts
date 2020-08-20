import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AgencyService } from '../agency.service';
import { ContentBlock } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-agency-editor',
  templateUrl: './agency-editor.component.html',
  styleUrls: ['./agency-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyEditorComponent implements OnInit {
  public render = this.agencyService.render;

  public blocks: ContentBlock[];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private agencyService: AgencyService) {
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

  private _save() {
    const promises = [];
    this.blocks.forEach((block: ContentBlock) => {
      block.is_enabled = true;
      promises.push(this.agencyService.save(block).toPromise());
    });

    this.toasterService.wrapPromise(
      Promise.all(promises), 'Сохранено', 'Не удалось сохранить');
  }

}
