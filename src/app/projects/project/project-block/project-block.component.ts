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

  public ngOnInit() {
    const elements = this.elements;
    const is_image = (element) => {
      return element.element_type === 'project-image';
    }

    if (!this.editor && elements?.length > 1 && is_image(elements[0])) {
      if (is_image(elements[1]) && !elements[1].contentFile) {
        this.elements = elements.slice(0, 1);
        this.fullWidth = true;
      }
    }
  }
}
