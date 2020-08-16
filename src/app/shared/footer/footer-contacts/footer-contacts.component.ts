import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContactsService } from '../../../contacts/contacts.service';
import { ContentBlock } from '@shared/types';

@Component({
  selector: 'r-footer-contacts',
  templateUrl: './footer-contacts.component.html',
  styleUrls: ['./footer-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterContactsComponent implements OnInit {
  public block: ContentBlock;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private contactsService: ContactsService) {
  }

  ngOnInit(): void {
    this.contactsService.get().subscribe((blocks: ContentBlock[]) => {
      this.block = blocks[0];
      this.changeDetectorRef.detectChanges();
    });
  }

}
