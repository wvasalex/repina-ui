import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ContactsService } from './contacts.service';
import { ContentBlock, ContentElement } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) map: ElementRef;

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

  public ngAfterViewInit(): void {
    const maps = window['google'].maps;
    const center = new maps.LatLng(55.801106, 37.6378429);
    const mapOptions = {
      zoom: 16,
      disableDefaultUI: true,
      scrollwheel: false,
      center: center,
      mapTypeId: maps.MapTypeId.ROADMAP
    };

    const map = new maps.Map(this.map.nativeElement, mapOptions);

    new maps.Marker({
      position: center,
      map: map,
      icon: '/assets/icons/contacts/pin.svg'
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
