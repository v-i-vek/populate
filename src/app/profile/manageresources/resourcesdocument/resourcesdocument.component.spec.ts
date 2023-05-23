import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesdocumentComponent } from './resourcesdocument.component';

describe('ResourcesdocumentComponent', () => {
  let component: ResourcesdocumentComponent;
  let fixture: ComponentFixture<ResourcesdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesdocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
