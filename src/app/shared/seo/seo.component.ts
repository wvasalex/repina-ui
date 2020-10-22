import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'r-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeoComponent implements OnInit {

  public formGroup: FormGroup = this.formBuilder.group({
    title: [''],
    description: [''],
    keywords: [''],
    robots: ['index, follow'],
  });

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }

}
