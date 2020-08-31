import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBlankComponent } from './service-blank.component';

describe('ServiceBlankComponent', () => {
  let component: ServiceBlankComponent;
  let fixture: ComponentFixture<ServiceBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
