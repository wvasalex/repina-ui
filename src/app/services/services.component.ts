import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentBlock } from '@shared/types';
import { ServicesEditorService } from './services-editor.service';
import { ServicesRenderService } from './services-render.service';

@Component({
  selector: 'r-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {

  public render = this.servicesRenderService.render;

  public blocks$: Observable<ContentBlock[]> = this.servicesEditorService.get();

  constructor(
    private servicesEditorService: ServicesEditorService,
    private servicesRenderService: ServicesRenderService) {
  }

  ngOnInit(): void {
  }

}
