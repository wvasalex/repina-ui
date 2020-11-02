import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentBlock } from '@shared/types';
import { ServicesEditorService } from './services-editor.service';
import { ServicesRenderService } from './services-render.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'r-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {

  public render = this.servicesRenderService.render;

  private blocks;

  public blocks$: Observable<ContentBlock[]> = this.servicesEditorService.get()
    .pipe(tap((blocks) => {
      this.blocks = blocks;
    }));

  constructor(
    private servicesEditorService: ServicesEditorService,
    private servicesRenderService: ServicesRenderService) {
  }

  ngOnInit(): void {
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
