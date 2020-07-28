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
import { RouterModule } from '@angular/router';
import { ParallaxDirective } from './parallax/parallax.directive';
import { MarqueeComponent } from './marquee/marquee.component';
import { PaddingComponent } from './padding/padding.component';
import { QuoteComponent } from './quote/quote.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { AButtonComponent } from './a-button/a-button.component';
import { WithSessionDirective } from './with-session.directive';

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
    ParallaxDirective,
    MarqueeComponent,
    PaddingComponent,
    QuoteComponent,
    SelectComponent,
    AButtonComponent,
    WithSessionDirective,
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
    ParallaxDirective,
    MarqueeComponent,
    PaddingComponent,
    QuoteComponent,
    SelectComponent,
    WithSessionDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
  ],
})
export class SharedModule {
}
