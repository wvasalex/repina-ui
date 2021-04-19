import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'r-journal-snippet',
  templateUrl: './journal-snippet.component.html',
  styleUrls: ['./journal-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalSnippetComponent {

  @Input() image: string;
  @Input() tag: string;
  @Input() title: string;
  @Input() imageVisible: boolean = false;

  constructor() {

  }

}
