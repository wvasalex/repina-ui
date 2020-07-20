import { Component, OnInit } from '@angular/core';

@Component({
  selector: 's-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  static guid: number = 1;

  public uid: string;

  constructor() { }

  ngOnInit(): void {
    this.uid = 'checkbox_' + CheckboxComponent.guid++;
  }

}
