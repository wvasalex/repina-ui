import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../breakpoint.service';
import { drawerAnimation } from '../animations';
import { RequestComponent } from './request/request.component';
import { MatDialog } from '@angular/material/dialog';

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

  public drawerOpened: boolean = false;

  public priceRequest: EventEmitter<void> = new EventEmitter<void>();

  private _priceRequest: Subscription;
  private _observe: Subscription;

  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2,
    private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      const w = window.innerWidth;
      const breakpoints = [1920, 1366, 1024, 768, 320];
      let cn = breakpoints.find((breakpoint) => w > breakpoint) || 320;

      if (typeof window !== 'undefined' && cn != 320) {
        if ('ontouchstart' in window ||
          (window['DocumentTouch'] && document instanceof window['DocumentTouch'])) {
          cn = 320;
        }
      }

      if (typeof document !== 'undefined') {
        this.renderer.setAttribute(document.documentElement, 'class', 'w' + cn);
      }
    });

    this._priceRequest = this.priceRequest.subscribe(() => {
      this.$priceRequest();
    });
  }

  ngOnDestroy(): void {
    this._observe?.unsubscribe();
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
