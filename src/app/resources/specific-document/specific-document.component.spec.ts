import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificDocumentComponent } from './specific-document.component';

describe('SpecificDocumentComponent', () => {
  let component: SpecificDocumentComponent;
  let fixture: ComponentFixture<SpecificDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
