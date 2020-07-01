import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { PageModule } from '../shared/page/page.module';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    PageModule,
    SharedModule,
  ],
})
export class ContactsModule { }
