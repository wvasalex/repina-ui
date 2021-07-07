import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '@shared/services/session';

@Directive({
  selector: '[rWithSession]',
})
export class WithSessionDirective implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private sessionService: SessionService) {
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.sessionService.isAdmin()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
