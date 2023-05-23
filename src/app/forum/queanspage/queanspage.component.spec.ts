import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueanspageComponent } from './queanspage.component';

describe('QueanspageComponent', () => {
  let component: QueanspageComponent;
  let fixture: ComponentFixture<QueanspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueanspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueanspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
