import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import { SelectOption } from '@shared/components/select/select.model';

@Component({
  selector: 'r-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectBlockComponent extends BaseBlock implements OnInit {
  @Input() availableElements: SelectOption[];

  @HostBinding('class.full-width') fullWidth: boolean = false;
  @HostBinding('class.media') media: boolean = false;

  public ngOnInit() {
    const elements = this.elements;
    const is_media = (element) => {
      return element.element_type === 'project-image' ||
        element.element_type === 'project-video';
    }

    if (elements?.length > 1 && is_media(elements[0])) {
      this.media = true;
      if (!this.editor && is_media(elements[1]) && !elements[1].contentFile) {
        this.elements = elements.slice(0, 1);
        this.fullWidth = true;
      }
    }
  }
}
