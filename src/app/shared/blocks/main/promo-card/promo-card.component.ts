import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { BaseBlock } from '@shared/blocks/block.component';

@Component({
  selector: 'r-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCardComponent extends BaseBlock implements OnInit {

  @Input() @HostBinding('attr.type') type: string;

  public ngOnInit(): void {
    //this.type = this.props.type || '1';
  }

}
