import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import videojs from 'video.js';
import { BaseBlock } from '@shared/blocks/block.component';
import { ApiService } from '@shared/services/api/api.service';
import { ArticleContentElement } from '../../../../journal/journal.model';

@Component({
  selector: 'r-article-video',
  templateUrl: './article-video.component.html',
  styleUrls: ['./article-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleVideoComponent extends BaseBlock implements AfterViewInit, OnDestroy {
  @ViewChild('video', { static: false }) video: ElementRef;

  private player: videojs.Player;

  constructor(
    private changeDetectoRef: ChangeDetectorRef,
    private api: ApiService) {
    super();
  }

  public ngAfterViewInit(): void {
    this.initPlayer();
  }

  public ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  public $upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('content_file', file);

    this.api.postFile('/api/v1/blog_content_elements/' + this.id + '/', data)
      .toPromise()
      .then((element: ArticleContentElement) => {
        this.contentFile = element.content_file;
        this.changeDetectoRef.detectChanges();
        this.initPlayer();
      });
  }

  private initPlayer() {
    if (this.player) {
      this.player.dispose();
    }

    if (!this.contentFile) {
      return;
    }

    this.player = videojs(this.video.nativeElement, {
      sources: [
        {
          type: 'video/mp4',
          src: this.contentFile,
        },
      ],
      controls: false,
      autoplay: true,
    }, () => {
      console.log('ready!',this.contentFile);
    });
  }
}
