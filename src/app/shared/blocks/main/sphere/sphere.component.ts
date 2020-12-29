import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ApiService } from '@shared/services/api/api.service';
import { ContentElement } from '@shared/types';
import videojs from 'video.js';

@Component({
  selector: 'r-sphere',
  templateUrl: './sphere.component.html',
  styleUrls: ['./sphere.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SphereComponent extends BaseBlock {

  @Output() contentFileChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() upload: EventEmitter<File> = new EventEmitter<File>();

  @ViewChild('video', { static: true }) video: ElementRef;

  @HostBinding('class.paused') public paused: boolean = false;
  @HostBinding('class.ready') public ready: boolean = false;
  public muted: boolean = true;

  private player: videojs.Player;

  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private api: ApiService,
  ) {
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

  public $toggleAudio(e: Event) {
    e.stopPropagation();

    this.player.muted(this.muted = !this.muted);
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.upload.emit(file);
    this.toasterService.info('Загрузка медиа...');
    this.api.postFile('/api/v1/main_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ContentElement) => {
        this.contentFile = element.content_file;
        this.contentFileChange.emit(this.contentFile);
        this.changeDetectoRef.detectChanges();

        this.toasterService.info('Медиа загружено!');

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
            src: this.contentFile + '#t=0',
          },
        ],
        controls: false,
        autoplay: true,
        loop: true,
      }, () => {
        this.player.muted(this.muted = true);
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
