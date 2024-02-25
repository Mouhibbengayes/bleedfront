import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllOldArticleComponent } from './show-all-article.component';

describe('ShowAllArticleComponent', () => {
  let component: ShowAllOldArticleComponent;
  let fixture: ComponentFixture<ShowAllOldArticleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAllOldArticleComponent]
    });
    fixture = TestBed.createComponent(ShowAllOldArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
