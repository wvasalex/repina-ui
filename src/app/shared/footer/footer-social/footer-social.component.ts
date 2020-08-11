import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentBlock, ContentElement } from '@shared/types';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FooterService } from '@shared/footer/footer.service';
import { ToasterService } from '@shared/toaster/toaster.service';

@Component({
  selector: 'r-footer-social',
  templateUrl: './footer-social.component.html',
  styleUrls: ['./footer-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSocialComponent {
  @Input() social: ContentBlock;
  @Input() editor: boolean;

  @Output() change: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toasterService: ToasterService,
    private footerService: FooterService,
  ) {
  }

  public $enabled(elements: ContentElement[]): ContentElement[] {
    return this.footerService.enabled(elements);
  }

  public $change() {
    this._save();
  }

  public $sort(event: CdkDragDrop<string[]>) {
    if (!this.editor) {
      return;
    }

    moveItemInArray(this.social.content_elements, event.previousIndex, event.currentIndex);
    this._save();
  }

  public $add() {
    this.social.content_elements.push({
      element_type: 'link',
      props: {
        href: '',
        text: ''
      },
    });
  }

  public $remove(element: ContentElement) {
    if (confirm('Удалить ссылку?')) {
      if (element.id) {
        element._destroy = true;
        this._save();
      }
      this.social.content_elements.splice(this.social.content_elements.indexOf(element), 1);
    }

    this.changeDetectorRef.detectChanges();
  }

  private _save() {
    this.social.content_elements.forEach((element: ContentElement, index: number) => {
      element.position = index;
    });

    const req = this.footerService.save(this.social).toPromise();

    this.toasterService.wrapPromise(req, 'Ссылки сохранены', 'Не уадлось сохранить!');
  }
}
