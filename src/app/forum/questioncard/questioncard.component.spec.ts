import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioncardComponent } from './questioncard.component';

describe('QuestioncardComponent', () => {
  let component: QuestioncardComponent;
  let fixture: ComponentFixture<QuestioncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestioncardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
