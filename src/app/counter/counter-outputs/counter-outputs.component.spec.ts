import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOutputsComponent } from './counter-outputs.component';

describe('CounterOutputsComponent', () => {
  let component: CounterOutputsComponent;
  let fixture: ComponentFixture<CounterOutputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterOutputsComponent]
    });
    fixture = TestBed.createComponent(CounterOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
