import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { BreakpointService } from '../breakpoint.service';

@Component({
  selector: 'r-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit, OnDestroy {
  @Input() menuColor: 'white' | 'black' = 'white';
  @Input() backgroundImage: string;
  @Input() contentTmp: TemplateRef<any>;
  @Input() customFooter: boolean = false;

  private _observe: Subscription;

  constructor(private renderer: Renderer2,
              private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    this._observe = this.breakpointService.change$.subscribe((result: BreakpointState) => {
      let points: string[] = ['320', '768', '1024', '1366'].filter((width: string) => {
        return result.breakpoints[`(max-width: ${width}px)`];
      });
      if (!points.length) {
        points = ['1920'];
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

}
