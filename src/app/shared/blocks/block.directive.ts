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
    const el = this.host.nativeElement;
    if (this.editable) {
      this.renderer.setAttribute(el, 'contenteditable', 'true');
      this.renderer.addClass(el, 'editable');
    } else {
      this.renderer.removeAttribute(el, 'contenteditable');
      this.renderer.removeClass(el, 'editable');
    }
  }

  @HostListener('blur') onBlur() {
    this.contentChanged.emit(this.host.nativeElement.innerText);
  }

}
