import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[r-block]',
})
export class BlockDirective implements OnInit {
  @Input('r-block') editable: boolean = false;

  @Output() contentChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private renderer: Renderer2,
              private host: ElementRef) {
  }

  public ngOnInit() {
    if (this.editable) {
      this.renderer.setAttribute(this.host.nativeElement, 'contenteditable', 'true');
    }
  }

  @HostListener('blur') onBlur() {
    this.contentChanged.emit(this.host.nativeElement.textContent);
  }
}
