import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { BadgeComponent } from './badge/badge.component';
import { InputComponent } from './input/input.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { BadgeListComponent } from './badge-list/badge-list.component';
import { ImageComponent } from './image/image.component';
import { ArrowComponent } from './arrow/arrow.component';

@NgModule({
  declarations: [
    LogoComponent,
    CardComponent,
    RatingComponent,
    BadgeComponent,
    InputErrorComponent,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    BadgeListComponent,
    ImageComponent,
    ArrowComponent,
  ],
  exports: [
    LogoComponent,
    CardComponent,
    RatingComponent,
    BadgeComponent,
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    BadgeListComponent,
    ImageComponent,
    ArrowComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule {
}
