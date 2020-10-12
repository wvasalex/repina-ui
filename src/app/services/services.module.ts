import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '@shared/components/shared.module';
import { PageModule } from '@shared/page/page.module';
import { GridModule } from '@shared/grid/grid.module';
import { BlocksModule } from '@shared/blocks/blocks.module';
import { ListContentModule } from '@shared/list-content/list-content.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServicesPrimaryComponent } from './services-primary/services-primary.component';
import { ServicesTechComponent } from './services-tech/services-tech.component';
import { ServicesTechTextComponent } from './services-tech/services-tech-text/services-tech-text.component';
import { ServiceComponent } from './service/service.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServiceEditorComponent } from './service-editor/service-editor.component';
import { ServiceHeaderComponent } from './service/service-header/service-header.component';
import { ServiceBlockComponent } from './service/service-block/service-block.component';
import { ServiceImageComponent } from './service/service-image/service-image.component';
import { ServiceBlankComponent } from './service/service-blank/service-blank.component';
import { ServiceTextComponent } from './service/service-text/service-text.component';
import { ServicesEditorComponent } from './services-editor/services-editor.component';
import { ServiceVideoComponent } from './service/service-video/service-video.component';
import { ServiceQuoteComponent } from './service/service-quote/service-quote.component';
import { ServiceRequestComponent } from './service/service-request/service-request.component';
import { SelectOptionsPipe } from '@shared/components/select/select-options.pipe';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesPrimaryComponent,
    ServicesTechComponent,
    ServicesTechTextComponent,
    ServiceComponent,
    ServicesListComponent,
    ServiceEditorComponent,
    ServiceHeaderComponent,
    ServiceBlockComponent,
    ServiceImageComponent,
    ServiceBlankComponent,
    ServiceTextComponent,
    ServicesEditorComponent,
    ServiceVideoComponent,
    ServiceQuoteComponent,
    ServiceRequestComponent,
    SelectOptionsPipe,
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
    ListContentModule,
    MarkdownModule,
  ],
})
export class ServicesModule {
}
