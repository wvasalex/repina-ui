import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';
import * as f from 'fast-average-color';

@Component({
  selector: 'r-agency-header',
  templateUrl: './agency-header.component.html',
  styleUrls: ['./agency-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyHeaderComponent extends BaseBlock {

  public $upload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this._getImageColor(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  private _getImageColor(src: string) {
    const fac = new f['default']();
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const color = fac.getColor(img);
      this.props.isDark = color.isDark;
    };
  }

}
