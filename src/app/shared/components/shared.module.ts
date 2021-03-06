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
import { WithSessionDirective } from './with-session.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { IconButtonComponent } from '@shared/components/icon-button/icon-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconComponent } from '@shared/components/icon/icon.component';
import { FabsComponent } from './fabs/fabs.component';
import { ImagePlaceholderComponent } from './image-placeholder/image-placeholder.component';
import { InputLabelComponent } from '@shared/components/input-label/input-label.component';
import { AspectRatioDirective } from './aspect-ratio.directive';
import { LinebreaksPipe } from './linebreaks.pipe';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StickyComponent } from './sticky/sticky.component';
import { MousemoveDirective } from '@shared/components/mousemove/mousemove.directive';
import { FormsModule } from '@angular/forms';
import { HrefPipe } from '@shared/components/href.pipe';
import { ViewportIntersectDirective } from '@shared/components/viewport-intersect.directive';
import { NoindexComponent } from './noindex/noindex.component';
import { BurgerComponent } from '@shared/components/burger/burger.component';

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
    WithSessionDirective,
    AvatarComponent,
    IconButtonComponent,
    IconComponent,
    FabsComponent,
    ImagePlaceholderComponent,
    InputLabelComponent,
    AspectRatioDirective,
    LinebreaksPipe,
    ImageUploadComponent,
    StickyComponent,
    MousemoveDirective,
    HrefPipe,
    ViewportIntersectDirective,
    NoindexComponent,
    BurgerComponent,
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
    AvatarComponent,
    IconButtonComponent,
    IconComponent,
    FabsComponent,
    ImagePlaceholderComponent,
    InputLabelComponent,
    AspectRatioDirective,
    LinebreaksPipe,
    ImageUploadComponent,
    StickyComponent,
    MousemoveDirective,
    HrefPipe,
    InputErrorComponent,
    ViewportIntersectDirective,
    NoindexComponent,
    BurgerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
  ],
})
export class SharedModule {
}
