import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfcareComponent } from './selfcare.component';

describe('SelfcareComponent', () => {
  let component: SelfcareComponent;
  let fixture: ComponentFixture<SelfcareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfcareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
