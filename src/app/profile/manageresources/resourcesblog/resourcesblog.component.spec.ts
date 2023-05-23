import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesblogComponent } from './resourcesblog.component';

describe('ResourcesblogComponent', () => {
  let component: ResourcesblogComponent;
  let fixture: ComponentFixture<ResourcesblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesblogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcesblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
