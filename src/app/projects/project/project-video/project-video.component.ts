import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy, OnInit,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-project-video',
  templateUrl: './project-video.component.html',
  styleUrls: ['./project-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectVideoComponent extends BaseBlock implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) video: ElementRef;

  public muted: boolean = true;

  private player: videojs.Player;

  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private api: ApiService) {
    super();
  }

  public ngOnInit(): void {
    this.initPlayer();
  }

  public ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  public $toggleAudio() {
    this.muted = !this.muted;

    this.video.nativeElement.muted = this.muted;
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.toasterService.info('Загрузка видео...');
    this.api.postFile('/api/v1/project_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ContentElement) => {
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();

        this.toasterService.info('Видео загружено!');

        this.initPlayer();
      });
  }

  private initPlayer() {
    if (!this.contentFile) {
      return;
    }

    if (!this.player) {
      this.player = videojs(this.video.nativeElement, {
        sources: [
          {
            type: 'video/mp4',
            src: this.contentFile,
          },
        ],
        controls: false,
        autoplay: true,
        loop: true,
      }, () => {
      });
    } else {
      this.player.src([
        {
          type: 'video/mp4',
          src: this.contentFile,
        },
      ]);
    }
  }
}
