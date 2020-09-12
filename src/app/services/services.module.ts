import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { GridModule } from '@shared/grid/grid.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServicesPrimaryComponent } from './services-primary/services-primary.component';
import { ServicesTechComponent } from './services-tech/services-tech.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServicesTechTextComponent } from './services-tech/services-tech-text/services-tech-text.component';
import { ServiceComponent } from './service/service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditorComponent } from './service-editor/service-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { ServiceHeaderComponent } from './service/service-header/service-header.component';
import { ServiceBlockComponent } from './service/service-block/service-block.component';
import { ServiceImageComponent } from './service/service-image/service-image.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ServiceBlankComponent } from './service/service-blank/service-blank.component';
import { ServiceTextComponent } from './service/service-text/service-text.component';
import { ServiceTitleComponent } from './service/service-title/service-title.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    ServicesComponent, ServicesPrimaryComponent, ServicesTechComponent, ServiceDetailComponent, ServicesTechTextComponent, ServiceComponent, ServiceListComponent, ServiceEditorComponent, ServiceHeaderComponent, ServiceBlockComponent, ServiceImageComponent, ServiceBlankComponent, ServiceTextComponent, ServiceTitleComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    PageModule,
    GridModule,
    BlocksModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonToggleModule,
  ],
})
export class ServicesModule {
}
