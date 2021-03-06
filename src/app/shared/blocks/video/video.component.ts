import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding, Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ToasterService } from '@shared/toaster/toaster.service';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent extends BaseBlock implements OnDestroy {

  @Output() contentFileChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() upload: EventEmitter<File> = new EventEmitter<File>();

  @ViewChild('video', {static: true}) video: ElementRef;

  @HostBinding('class.paused') public paused: boolean = true;

  @Input() endpoint: string;
  public muted: boolean = true;

  private player: videojs.Player;

  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private api: ApiService) {
    super();
  }

  public ngOnDestroy() {
    this.player?.dispose();
  }

  public $intersect() {
    this.initPlayer();
  }

  public $onClick() {
    if (this.props.autoplay) {
      return;
    }

    this.paused = !this.paused;
    if (this.paused) {
      this.player.pause();
    } else {
      this.player.play();
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
    this.api.postFile('/api/v1/' + this.endpoint + '/' + this.id + '/', data)
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
            src: this.contentFile + '#t=0.001',
          },
        ],
        controls: false,
        autoplay: this.props.autoplay,
        loop: this.props.autoplay,
        responsive: true,
        fill: true,
        fluid: true,
      }, () => {
        this.player.muted(this.muted = !!this.props.autoplay);
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
