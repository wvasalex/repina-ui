import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessionService } from '@shared/services/session';

@Directive({
  selector: '[rWithSession]'
})
export class WithSessionDirective implements OnInit {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private sessionService: SessionService) { }

  public ngOnInit(): void {
    if (this.sessionService.isValid()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
