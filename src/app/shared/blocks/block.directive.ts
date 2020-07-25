import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[r-block]',
})
export class BlockDirective implements OnInit {
  @Input('r-block') editable: boolean = false;

  @Output() contentChanged: EventEmitter<string> = new EventEmitter<string>();

  public edit: boolean = false;

  constructor(private renderer: Renderer2,
              private host: ElementRef) {
  }

  public ngOnInit() {
  }

  @HostListener('click') onClick() {
    if (!this.edit) {
      this.edit = true;
      this.switchMode();
    }
  }

  @HostListener('blur') onBlur() {
    this.contentChanged.emit(this.host.nativeElement.textContent);
  }

  private switchMode() {
    this.renderer.setAttribute(this.host.nativeElement, 'contenteditable', this.edit ? 'true' : 'false');
  }
}
