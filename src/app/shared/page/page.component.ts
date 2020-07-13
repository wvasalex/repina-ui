import {
  ChangeDetectionStrategy,
  Component, ContentChild, ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef, ViewChild,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../breakpoint.service';
import { drawerAnimation } from '../animations';
import { RequestComponent } from './request/request.component';

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
  @Input() contentTmp: TemplateRef<any>;
  @Input() customFooter: boolean = false;

  @ViewChild(RequestComponent, { static: false }) requestViewChild: RequestComponent;

  public drawerOpened: boolean = false;

  private _observe: Subscription;

  constructor(
    private renderer: Renderer2,
    private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      const breakpoints: string[] = ['320', '480', '768', '1024', '1366', '1680', '1920'];
      let breakpoint: number = breakpoints.findIndex((width: string) => {
        return result.breakpoints[`(max-width: ${width}px)`];
      });
      if (breakpoint == -1) {
        breakpoint = breakpoints.length - 1;
      }

      const points = breakpoints.slice(breakpoint);

      if (typeof window !== 'undefined' && points.indexOf('320') == -1) {
        if ('ontouchstart' in window ||
          (window['DocumentTouch'] && document instanceof window['DocumentTouch'])) {
          points.push('320');
        }
      }

      const classes = points.map((w: string) => {
        return 'w' + w;
      });


      if (typeof document !== 'undefined') {
        this.renderer.setAttribute(document.body, 'class', classes.join(' '));
      }
    });
  }

  ngOnDestroy(): void {
    this._observe.unsubscribe();
  }

  public $toggleDrawer(opened: boolean) {
    this.drawerOpened = opened;
  }

  public $priceRequest() {
    if (this.drawerOpened) {
      this.drawerOpened = false;
    }

    const requestForm = this.requestViewChild;

    if (requestForm) {
      requestForm.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
