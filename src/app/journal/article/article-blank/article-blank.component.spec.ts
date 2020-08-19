import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBlankComponent } from './article-blank.component';

describe('ArticleBlankComponent', () => {
  let component: ArticleBlankComponent;
  let fixture: ComponentFixture<ArticleBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
