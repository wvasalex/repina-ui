import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentElement } from '@shared/types';
import { VideoComponent } from '@shared/blocks/video/video.component';

@Component({
  selector: 'r-project-video',
  templateUrl: './project-video.component.html',
  styleUrls: ['./project-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectVideoComponent extends BaseBlock {}
