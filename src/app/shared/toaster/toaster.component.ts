import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 's-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {

  public type: string = 'info';
  public text: string;

  private timeout: any;

  constructor(private snackBar: MatSnackBar) { }

  public show(text: string, options = null) {
    /*options = options || {};
    clearTimeout(this.timeout);

    if (options.type) {
      this.type = options.type;
    }
    this.text = text;

    this.timeout = setTimeout(() => {
      this.text = null;
    }, options.timeout || 3000);*/

    // this.snackBar.open(this.text, )
  }

}
