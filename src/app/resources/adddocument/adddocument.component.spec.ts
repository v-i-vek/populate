import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddocumentComponent } from './adddocument.component';

describe('AdddocumentComponent', () => {
  let component: AdddocumentComponent;
  let fixture: ComponentFixture<AdddocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
