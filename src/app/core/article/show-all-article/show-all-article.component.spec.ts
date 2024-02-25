import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllArticleComponent } from './show-all-article.component';

describe('ShowAllArticleComponent', () => {
  let component: ShowAllArticleComponent;
  let fixture: ComponentFixture<ShowAllArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllArticleComponent]
    });
    fixture = TestBed.createComponent(ShowAllArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
