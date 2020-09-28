import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'r-journal-snippet',
  templateUrl: './journal-snippet.component.html',
  styleUrls: ['./journal-snippet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalSnippetComponent implements OnInit {
  @Input() image: string;
  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
