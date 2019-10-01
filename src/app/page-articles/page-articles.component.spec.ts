import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageArticlesComponent } from './page-articles.component';

describe('PageArticlesComponent', () => {
  let component: PageArticlesComponent;
  let fixture: ComponentFixture<PageArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
