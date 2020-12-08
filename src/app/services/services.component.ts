import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContentBlock } from '@shared/types';
import { ServicesEditorService } from './services-editor.service';
import { ServicesRenderService } from './services-render.service';
import { FooterService } from '@shared/footer/footer.service';

@Component({
  selector: 'r-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit, OnDestroy {

  public render = this.servicesRenderService.render;

  private blocks;

  public blocks$: Observable<ContentBlock[]> = this.servicesEditorService.get()
    .pipe(tap((blocks) => {
      this.blocks = blocks;
    }));

  constructor(
    private servicesEditorService: ServicesEditorService,
    private servicesRenderService: ServicesRenderService,
    private footerService: FooterService,
  ) {
  }

  public ngOnInit(): void {
    this.footerService.setBreadcrumbs([
      {
        href: '/services',
        text: 'Услуги',
      },
    ]);
  }

  public ngOnDestroy(): void {
    this.footerService.setBreadcrumbs([]);
  }

  /*@HostListener('dblclick') init() {
    this.blocks.unshift({
      block_type: 'services-header',
      position: 0,
      props: {
        title: 'blablabla',
        subtitle: 'Услуги',
      }
    });

    this.blocks.forEach((block, p) => {
      block.position = p;
      this.servicesEditorService.save(block).subscribe();
    });


  }*/

}
