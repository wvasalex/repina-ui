import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from '@shared/services/session';
import { drawerAnimation } from '../animations';
import { RequestComponent } from './request/request.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'r-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    drawerAnimation,
  ],
})
export class PageComponent implements OnInit, OnDestroy {

  @Input() menuColor: 'white' | 'black' = 'white';
  @Input() backgroundImage: string;
  @Input() fullscreenBackgroundImage: boolean = false;
  @Input() contentTmp: TemplateRef<any>;
  @Input() customFooter: boolean = false;

  @ViewChild(RequestComponent, {static: false}) requestViewChild: RequestComponent;

  public sessionValid: boolean = this.sessionService.isAdmin();
  public drawerOpened: boolean = false;
  public priceRequest: EventEmitter<void> = new EventEmitter<void>();
  public platformBrowser: boolean = isPlatformBrowser(this.platformId);

  private _priceRequest: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    private sessionService: SessionService,
    ) {
  }

  ngOnInit(): void {
    if (!this.platformBrowser) {
      return;
    }

    this._priceRequest = this.priceRequest.subscribe(() => {
      this.$priceRequest();
    });
  }

  ngOnDestroy(): void {
    this._priceRequest?.unsubscribe();
  }

  public $toggleDrawer(opened: boolean) {
    this.drawerOpened = opened;
  }

  public $priceRequest() {
    if (this.drawerOpened) {
      this.drawerOpened = false;
    }

    const {innerWidth, innerHeight} = window;
    this.dialog.open(RequestComponent, {
      width: innerWidth + 'px',
      height: innerHeight + 'px',
      maxWidth: 'none',
      hasBackdrop: false,
      panelClass: 'borderless',
      data: {
        popup: true,
      },
    });
  }
}
