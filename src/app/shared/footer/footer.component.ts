import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FooterService } from '@shared/footer/footer.service';
import { ContentBlock } from '@shared/types';

@Component({
  selector: 'r-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

  public left: ContentBlock;
  public social: ContentBlock;

  public editor: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private footerService: FooterService,
  ) {
  }

  ngOnInit(): void {
    this.footerService.get().subscribe((blocks: ContentBlock[]) => {
      this.left = blocks.find((block: ContentBlock) => block.block_type == 'footer');
      this.social = blocks.find((block: ContentBlock) => block.block_type == 'social');

      this.changeDetectorRef.detectChanges();
    });

    /*for (let i = 0; i < 17; i++) {
      this.footerService.delete(i).subscribe();
    }

    this.footerService.post({
      block_type: 'footer',
      props: {},
      is_enabled: true,
      content_elements: [
        {
          element_type: 'about',
          props: {
            enabled: true,
          },
        },
      ]
    }).subscribe();

    this.footerService.post({
      block_type: 'social',
      props: {},
      is_enabled: true,
      content_elements: [
        {
          element_type: 'link',
          props: {
            text: 'Facebook',
            href: 'htps://facebook.com',
            enabled: true,
          },
        },
        {
          element_type: 'link',
          props: {
            text: 'Behance',
            href: 'htps://behance.com',
            enabled: true,
          },
        },
        {
          element_type: 'link',
          props: {
            text: 'Twitter',
            href: 'htps://twitter.com',
            enabled: true,
          },
        },
      ]
    }).subscribe();*/
  }

  public $toggleEditor() {
    this.editor = !this.editor;
  }

  public $save() {
    this.footerService.save(this.left).toPromise();
  }
}
