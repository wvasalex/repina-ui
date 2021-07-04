import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SeoModule } from '@shared/seo/seo.module';
import { SharedModule } from '@shared/components/shared.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RestoreComponent } from './restore/restore.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    RestoreComponent,
  ],
  imports: [
    CommonModule,
    SeoModule,
    RouterModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {
}
