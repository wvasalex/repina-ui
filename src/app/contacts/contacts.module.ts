import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { PageModule } from '@shared/page/page.module';
import { SharedModule } from '@shared/components/shared.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { ContactsAddressComponent } from './contacts-address/contacts-address.component';

@NgModule({
  declarations: [ContactsComponent, ContactsAddressComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    PageModule,
    SharedModule,
    BlocksModule,
  ],
})
export class ContactsModule { }
