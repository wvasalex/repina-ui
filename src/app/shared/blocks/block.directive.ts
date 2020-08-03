import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[r-block]',
})
export class BlockDirective implements OnChanges {
  @Input('r-block') editable: boolean = false;

  @Output() contentChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private renderer: Renderer2,
              private host: ElementRef) {
  }

  public ngOnChanges() {
    if (this.editable) {
      this.renderer.setAttribute(this.host.nativeElement, 'contenteditable', 'true');
      this.renderer.addClass(this.host.nativeElement, 'editable');
    } else {
      this.renderer.removeAttribute(this.host.nativeElement, 'contenteditable');
      this.renderer.removeClass(this.host.nativeElement, 'editable');
    }
  }

  @HostListener('blur') onBlur() {
    this.contentChanged.emit(this.host.nativeElement.textContent);
  }
}
