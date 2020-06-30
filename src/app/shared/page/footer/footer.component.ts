import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public social: string[] = ['Facebook', 'Behance', 'Twitter', 'Pinterest', 'Vimeo', 'Dribbble'];

  constructor() { }

  ngOnInit(): void {
  }

}
