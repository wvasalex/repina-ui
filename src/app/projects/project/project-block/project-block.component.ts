import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';
import { ContentElement } from '@shared/types';

@Component({
  selector: 'r-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectBlockComponent extends BaseBlock implements OnInit, AfterContentChecked {
  @Input() availableElements: SelectOption[];

  @HostBinding('class.full-width') fullWidth: boolean = false;
  @HostBinding('class.has-media') hasMedia: boolean = false;
  @HostBinding('class.first-media') media: boolean = false;

  @HostBinding('style.background') background: string;
  @HostBinding('class.white') white: boolean = false;

  public ngOnInit() {
    const elements = this.elements;
    const is_media = (element: ContentElement) => {
      return element.element_type === 'project-image' ||
        element.element_type === 'project-video';
    }

    this.hasMedia = elements.length > 0 && elements.filter(is_media).length > 0;

    if (elements?.length > 1 && is_media(elements[0])) {
      this.media = true;
      if (!this.editor && is_media(elements[1]) && !elements[1].contentFile) {
        this.elements = elements.slice(0, 1);
        this.fullWidth = true;
      }
    }
  }

  public ngAfterContentChecked() {
    this.background = this.props.background;
    this.white = this.props.color === 'white';
  }
}
