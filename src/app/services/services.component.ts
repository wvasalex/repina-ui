import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentBlock } from '@shared/types';
import { ServicesService } from './services.service';
import { ServicesEditorService } from './services-editor.service';

@Component({
  selector: 'r-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {

  public render = this.servicesService.render;

  public blocks$: Observable<ContentBlock[]> = this.servicesEditorService.get();

  constructor(
    private servicesEditorService: ServicesEditorService,
    private servicesService: ServicesService) {
  }

  ngOnInit(): void {
  }

}
