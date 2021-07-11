import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayComponent } from './pay.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { RefSharedModule } from '../ref-shared/ref-shared.module';
import { SharedModule } from '@shared/components/shared.module';
import { WithdrawalHistoryComponent } from './withdrawal-history/withdrawal-history.component';


@NgModule({
  declarations: [
    PayComponent,
    WithdrawalComponent,
    WithdrawalHistoryComponent
  ],
  imports: [
    CommonModule,
    RefSharedModule,
    SharedModule,
  ],
})
export class PayModule { }
