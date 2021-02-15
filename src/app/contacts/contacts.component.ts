import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ContactsService } from './contacts.service';
import { ContentBlock } from '@shared/types';
import { ToasterService } from '@shared/toaster/toaster.service';
import { FooterService } from '@shared/footer/footer.service';

@Component({
  selector: 'r-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static: false}) map: ElementRef;

  public block: ContentBlock;

  public editor: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private contactsService: ContactsService,
    private footerService: FooterService,
  ) {
  }

  public ngOnInit(): void {
    this.contactsService.get().subscribe((blocks: ContentBlock[]) => {
      this.block = blocks[0];
      this.changeDetectorRef.detectChanges();
    });

    this.footerService.setBreadcrumbs([
      {
        href: '/contacts',
        text: 'Контакты',
      },
    ]);
  }

  public ngOnDestroy(): void {
    this.footerService.setBreadcrumbs([]);
  }

  public ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const loader = new Loader({
      apiKey: 'AIzaSyDhSZQh9vTDnc7Meb2apgiJ1QiPOkKzz2U',
      version: 'weekly',
    });

    loader.load().then(() => {
      this._init();
    });
  }

  public $toggleEditor() {
    this.editor = !this.editor;
  }

  public $save() {
    const req = this.contactsService.save(this.block).toPromise();

    this.toasterService.wrapPromise(req, 'Контакты сохранены!', 'Не удалось сохранить контакты!');
  }

  private _init() {
    const maps = window['google'].maps;
    const center = new maps.LatLng(55.801106, 37.6378429);
    const mapOptions = {
      zoom: 16,
      disableDefaultUI: true,
      scrollwheel: false,
      center: center,
      mapTypeId: maps.MapTypeId.ROADMAP,
    };

    const map = new maps.Map(this.map.nativeElement, mapOptions);

    new maps.Marker({
      position: center,
      map: map,
      icon: '/assets/icons/contacts/pin.svg',
    });
  }

  /*@HostListener('dblclick') onInit() {
    this.contactsService.init();
  }*/

}
