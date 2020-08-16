import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { ContentBlock, ContentElement } from '@shared/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseBlock } from '@shared/blocks/block.component';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  public block: ContentBlock;

  public editor: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private contactsService: ContactsService,
  ) {
  }

  ngOnInit(): void {
    this.contactsService.get().subscribe((blocks: ContentBlock[]) => {
      this.block = blocks[0];
      this.changeDetectorRef.detectChanges();
    });
  }

  public $toggleEditor() {
    this.editor = !this.editor;
  }

  public $save() {
    const req = this.contactsService.save(this.block).toPromise();

    this.toasterService.wrapPromise(req, 'Контакты сохранены!', 'Не удалось сохранить контакты!');
  }

  /*@HostListener('dblclick') onInit() {
    this.contactsService.init();
  }*/

}
